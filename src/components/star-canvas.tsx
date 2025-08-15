import { useEffect, useRef, useState } from "react";
import { useResizeCanvas } from "./canvas-resize-hook";
import "../styles/star-canvas.css";
import { commatize } from "../utils/util";
import { useAppSelector } from "../state/hooks";
import { selectEncounter, selectTravel } from "../state/selectors";

export default function StarCanvas({
  density = 0.005,
  starSize = 1
}: {
  density?: number;
  starSize?: number;
}) {
  const travel = useAppSelector(selectTravel);
  const encounter = useAppSelector(selectEncounter);
  const [warp, setWarp] = useState(false);
  const [warpStartTime, setWarpStartTime] = useState(0);
  const [warpEndTime, setWarpEndTime] = useState(0);
  const [starsArray, setStarsArray] = useState<Star[]>(randomStars(200));

  useEffect(() => {
    if (travel&& travel.progress < 1) {
        setWarp(true);
        setWarpStartTime(Date.now());
    } else {
        setWarp(false);
        setWarpEndTime(Date.now());
    }
  }, [travel, encounter]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useResizeCanvas(canvasRef, canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let stars = starsArray;

    const img = new Image();
    // img.src = "/star.png";

    let stopDrawing = false;
    let imageLoaded = false;

    let repositionedStarsAfterWarp = false;

    let lastDraw = Date.now();
    const draw = () => {
        if (stopDrawing) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const box = canvas.getBoundingClientRect();
        const width = box.width;
        const height = box.height;
        const now = Date.now();
        const delta = now - lastDraw;
        lastDraw = now;

        const targetStarCount = density * width * height;
        while (stars.length < targetStarCount) {
          stars.push(randomStar(false));
        }

        while (stars.length > targetStarCount) {
          stars.pop();
        }

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        const center = {x: width / 2, y: height / 2};
        const warpRampUpFrac = Math.min((Date.now() - warpStartTime) / WARP_RAMP_UP, 1);
        const warpRampDownFrac = 1 - Math.min((Date.now() - warpEndTime) / WARP_RAMP_DOWN, 1);
        const warpRampingDown = warpRampDownFrac > 0 && warp == false;
        const warpFrac = warpRampingDown ? warpRampDownFrac : warpRampUpFrac;
        const getTrailLength = (age: number, pow: number) => {
          // return 1*pow*warpFrac;
          return (1 - (STAR_CYCLE - age) / STAR_CYCLE)*pow*warpFrac;
        }
        
        if (repositionedStarsAfterWarp == false && warpRampingDown) {
          repositionedStarsAfterWarp = true;
          // Reposition stars to tails of lines.
          for (const star of stars) {
            const pos = {x: width * star.pos.x, y: height * star.pos.y};
            const len = getTrailLength(Date.now() - star.birth, 0.3);
            star.pos.x += (((pos.x - center.x)*len)/width);
            star.pos.y += (((pos.y - center.y)*len)/height);
          }
        }

        for (const star of stars) {
          const pos = {x: width * star.pos.x, y: height * star.pos.y};
          const age = Date.now() - star.birth;
          const mag = 1 - Math.abs(age - STAR_CYCLE / 2) / (STAR_CYCLE / 2);
          ctx.globalAlpha = Math.max(mag, 0);

          if (warp || warpRampingDown) {
            const len = getTrailLength(age, 0.3);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            if (warpRampingDown) {
              ctx.lineTo(pos.x - (pos.x - center.x)*len*0.9, pos.y - (pos.y - center.y)*len*0.9);
            } else {
              ctx.lineTo(pos.x + (pos.x - center.x)*len, pos.y + (pos.y - center.y)*len);
            }
            ctx.closePath();
            ctx.stroke();
            
            star.pos.x += (pos.x - center.x) * warpFrac * 0.0000005 * delta;
            star.pos.y += (pos.y - center.y) * warpFrac * 0.0000005 * delta;
          } else {
            repositionedStarsAfterWarp = false;
            if (imageLoaded) {
                ctx.drawImage(
                    img,
                    pos.x, pos.y,
                    8 * star.size * starSize,
                    8 * star.size * starSize
                  );
              } else {
                ctx.fillRect(pos.x, pos.y,
                    2 * star.size * starSize,
                    2 * star.size * starSize);
              }
          }
          

          if (age >= STAR_CYCLE) {
            const newStar = randomStar(true);
            star.pos = newStar.pos;
            star.birth = Date.now() + (age % STAR_CYCLE);
          }
        }

        setStarsArray(stars);
        requestAnimationFrame(draw);
    };
    draw();

    img.onload = () => {
      imageLoaded = true; 
    };


    return () => {
      stopDrawing = true;
    };
  }, [warp]);

  return (
    <div ref={containerRef} className="star-canvas-container">
      <canvas ref={canvasRef} className="star-canvas"></canvas>
    </div>
  );
}

type Vec2 = { x: number; y: number };

type Star = {
  pos: Vec2;
  birth: number;
  size: number;
};

const STAR_CYCLE = 5000;
const SMALL_STAR = 0.2;
const BIG_STAR = 1;
const WARP_RAMP_UP = 1500;
const WARP_RAMP_DOWN = 500;

function randomStar(current: boolean = false): Star {
  return {
    pos: {
      x: Math.random(),
      y: Math.random(),
    },
    birth: Date.now() - (current ? 0 : Math.floor(Math.random() * STAR_CYCLE)),
    size: Math.random() * (BIG_STAR - SMALL_STAR) + SMALL_STAR,
  };
}

function randomStars(length: number): Star[] {
  return Array.from({ length }, () => randomStar());
}

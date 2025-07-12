// Thanks GPT

import {
  PopulationClass,
  Station,
  StationIndustry,
  StationType,
} from "./station";
import { randomItems, randomOf } from "./util";

export function generateFlavortext(
  type: StationType,
  industry: StationIndustry,
  populationClass: PopulationClass
) {
  let result = "";
  result += randomOf(StationTypeFlavortext[type]);
  result += " " + randomOf(StationIndustryFlavortext[industry]);
  result += " " + randomOf(PopulationClassFlavortext[populationClass]);
  result += " " + randomItems(atmosphere, 2).join(" ");
  return result;
}

const StationTypeFlavortext = {
  station: [
    "This station hosts various services for the population on and around it.",
    "This station supports many local industries through goods, services, and infrastructure.",
    "This station houses many different species, all working together to keep the place running.",
  ],
  outpost: [
    "This small outpost is home to only a few residents, most of the work is automated.",
    "This outpost supplies the outer reaches of civilization with the essentials.",
    "This outpost may be small, but it is a vital supply point for local industry.",
  ],
  depot: [
    "This depot is always busy with cargo ships dropping off and picking up supplies.",
    "This station is a depot where many supplies are stored.",
    "Components and materials for various industries are stored in this depot.",
  ],
  relay: [
    "This small station acts as a communcation relay for the local subsystem.",
    "This relay hosts communication infrastructure for the nearby inhabitants.",
    "This relay supports local industries with high quality communication interfaces.",
  ],
  hub: [
    "This hub is massive, a gathering place of all species and industries. Everything you could imagine is sold here.",
    "An incredible feat of engineering, this hub is the central location of all trade in the local subsystem.",
    "This station is a hub for trading. It hosts all kinds of people and places.",
  ],
  refinery: [
    "This refinery processes ore into various metals.",
    "This station refines ore into high and low grade metal.",
    "This refinery provides a steady flow of metal to nearby factories.",
  ],
  factory: [
    "With various kinds of large industrial machinery looming above the walkways, this station is made with production in mind.",
    "This factory has many small company shops that sell various goods to the resident workers.",
    "This factory is busy and loud. The smell of metallic dust fills the air, despite the air filters working at full capacity.",
  ],
};

const StationIndustryFlavortext = {
  mining: [
    "Here, local asteroids are mined for their precious ores.",
    "A steady stream of mining ships flow into and out of the many cargo ports around the station.",
    "Ore is mined from the local moon and brought here for further shipping to refineries.",
  ],
  refining: [
    "Here, metals are made from the raw ores provided by the local mining industry.",
    "At this station, ore is processed into large metal sheets.",
    "A massive crucible of molten metal passes overhead, towards some unknown destination.",
  ],
  manufacturing: [
    "Here, formless metal is turned into various components.",
    "Fasteners, beams, casings, and more are produced from pressing and reflowing metals.",
    "A bunch of little metal parts used in almost every product are produced here.",
  ],
  assembling: [
    "Here, various parts and components are assembled into products.",
    "The factory floor houses thousands of workers, both organic and robotic, working in unison to assemble many things.",
    "Several local industries rely on this assembly factory to create products they need.",
  ],
  trading: [
    "Here, many goods and services are traded.",
    "Unlike more organized stations, this station is a patchwork of shops, utilities, restaurants, and housing bays.",
    "There are too many little stores to count, and it's not really clear what most of them sell.",
  ],
  supplying: [
    "Here, essential supplies like food and water are sold.",
    "Here, there are only the essentials - food, water, and air.",
    "Not enough people come here to support any business past the selling of essentials like food and water.",
  ],
};

const PopulationClassFlavortext = {
  1: [
    "There aren't many workers around, and the place feels mostly empty.",
    "There aren't enough workers to keep up with system maintenance, so robots fill in the gaps.",
    "The station is small, but more than enough space for the current population.",
  ],
  2: [
    "The station map shows several residential bays, enough to house up to 10,000 people.",
    "There are some people waiting around the ship bay, looking for work.",
    "The station seems to be growing, gaining about a thousand residents every solar cycle.",
  ],
  3: [
    "This station is large enough to house 100,000 people.",
    "The infrastructure required to house its population takes up a sizable portion of the station.",
  ],
  4: [
    "The infrastructure required to support the population is an incredible sight to behold.",
    "This station was built to support up to 1,000,000 people. At the time it seemed like overkill, but the population is approaching the limit surprisingly fast.",
    "There are hundreds of people everywhere you look. You can't find a quiet corner in this station even if you tried.",
  ],
};

const atmosphere = [
  "The bay you docked in is small, only enough space for a couple ships.",
  "You can see pneumatic tubes lining the corners of the ceilings, items zipping through them.",
  "Behind some glass you can see the inner workings of a fully-automated cargo port: hundreds of specialized robots working synchronously to load and unload autonomous vehicles.",
  "Some of the floor panels are rusted, you can even see through some of them down to the nutrition bay below.",
  "It seems like traffic is highly regulated here. The station has several docking bays, but the autonomous system only let you dock in this one.",
  "The gravity field seems to be calibrated incorrectly, and it'll take a few minutes for you to get used to it.",
  "You can see a wall terminal showing shipping stats from the last few cycles - mostly steady, but not booming.",
  "You can feel a the floor vibrate every so often, probably from nearby generators.",
  "The floors and walls are scratched up from years of heavy machinery and miscalibrated docking computers.",
  "There's a standing info panel, but the touch interface only works on half the screen.",
  "Across from the docking bay is a steep dropoff, giving a great view of the resedential bays.",
  "One of the old holopanels loops an outdated orientation video on mute.",
  "There's a light breeze from the ventilation - it smells faintly of ozone and something synthetic.",
  "The intercom beeps every few minutes, but nobody seems to care.",
  "The area just past the docking bay is surprisingly clean.",
  "There are anchor points in the floor used for zero-G maintenance. It seems like this station doesn't have a backup gravity field generator.",
  "Cleaning droids sweep through every few minutes, keeping the floor spotless.",
  "Despite everything looking newly manufactured and modern, the main screen above the docking bay exit is already broken.",
  "There are soot marks on the floor radiating out from the docking port next to yours - a ship must have experienced rapid unintentional disassembly here.",
  "The ceiling above the bay is blackened in places, probably from years of unregulated thruster activity.",
  "Several wall panels are missing entirely, exposing insulation and bundles of dusty cabling.",
  "The docking clamps here look newer than the rest of the equipment.",
  "When your ship approached the docking bay, a nimble array of mechanical arms guided your ship to the appropriate spot.",
  "There's an overhead display showing arrival and departure logs in real time.",
  "Wall-mounted control panels show status indicators for bay pressure, magnetic clamps, and internal gravity.",
  "There's a security checkpoint built into the wall, with scanner panels and a personnel station.",
  "A map of the station's immediate sector is printed onto a static display beside the exit.",
];

// V2
/*
const StationTypeFlavortext = {
  station: [
    "This facility supports a broad range of operations and daily activity.",
    "A central node for multiple systems, the station handles varied functions.",
    "The station manages logistics, maintenance, and traffic coordination across sectors.",
    "With infrastructure to support diverse roles, it serves as a general-purpose hub.",
    "This structure accommodates long-term habitation, administration, and modular expansion.",
  ],
  outpost: [
    "This installation operates on limited systems with a focus on sustainability.",
    "Most functions here are streamlined for autonomy and minimal upkeep.",
    "The outpost is self-contained, optimized for endurance in remote conditions.",
    "This facility maintains essential operations with a small, permanent presence.",
    "Support systems are simplified, built for reliability and field utility.",
  ],
  depot: [
    "This facility handles regular intake and output of materials and equipment.",
    "Cargo systems are central here, with active routing and transfer operations.",
    "Bulk storage and processing capacity define the depot’s main function.",
    "Transit schedules and supply flow are managed through automated controls.",
    "Freight operations form the core of activity, emphasizing throughput and access.",
  ],
  relay: [
    "This station operates as a transit and communications junction.",
    "Traffic routing and signal processing define the primary functions here.",
    "The relay maintains synchronization for data, shipments, and positioning.",
    "Minimal facilities support routing, coordination, and system updates.",
    "Designed for efficiency, this node enables continuous flow of assets and info.",
  ],
  hub: [
    "This facility is a convergence point for routes, services, and travelers.",
    "Dozens of traffic lanes and docking zones operate in constant rotation.",
    "Trade, transit, and administration are all centralized here.",
    "Multiple sectors coordinate operations for traffic, storage, and exchange.",
    "This hub facilitates movement and exchange at regional scale.",
  ],
  refinery: [
    "The facility processes incoming raw material into usable resources.",
    "Primary systems refine inputs into metals, gases, and industrial stock.",
    "Continuous intake and sorting operations keep production stable.",
    "This station houses reaction vessels and filtration arrays for processing.",
    "Automation governs most stages of raw-to-finished conversion.",
  ],
  factory: [
    "The facility supports high-frequency production with modular systems.",
    "Assembly lines and material feeds operate with synchronized precision.",
    "Manufacturing tasks are organized into enclosed, specialized zones.",
    "System uptime and efficiency are prioritized over adaptability.",
    "Each segment of the station contributes to a fixed production chain.",
  ],
};
const StationIndustryFlavortext = {
  mining: [
    "Resource extraction is the core function, with cycles of intake and offload managed continuously.",
    "Survey data and extraction yields are monitored closely to maintain output quotas.",
    "The facility oversees collection, sorting, and preparation of raw materials.",
    "Drilling equipment and resource haulers operate in coordination with external teams.",
    "Processing of newly acquired ore begins immediately upon offload from inbound carriers.",
  ],
  refining: [
    "Incoming materials are routed through purification, reduction, and separation systems.",
    "Production workflows prioritize efficiency across multiple processing lines.",
    "Quality control systems regulate the output of refined industrial feedstock.",
    "Most operations are automated, managing volatile or high-temperature reactions.",
    "Converted materials are sorted, stored, or redirected for shipment to other sites.",
  ],
  manufacturing: [
    "Component assembly and calibration make up the bulk of ongoing tasks.",
    "Precision tooling and supply chain inputs are essential to keep production moving.",
    "Each sector is dedicated to fabricating parts for broader industrial use.",
    "Outputs are standardized components, packaged for transport or integration.",
    "Production units run on preset cycles, with minimal interruption for maintenance.",
  ],
  assembling: [
    "Final goods are compiled from standardized parts sourced from multiple origins.",
    "Assembly stations are organized by product type, optimizing flow and storage.",
    "Packing, inspection, and dispatch are part of the daily workflow.",
    "System integration and testing occur before completed items are cleared for shipment.",
    "The facility handles finished product verification and outbound logistics.",
  ],
  trading: [
    "Goods are received, cataloged, and redistributed through secure trade systems.",
    "Market rates update frequently as inventories shift with each docking.",
    "Commercial traffic maintains steady flow through dedicated exchange bays.",
    "Brokerage, customs, and inspection offices manage legal and private cargo.",
    "Trade manifests show activity across dozens of commodity categories.",
  ],
  supplying: [
    "Essential provisions are stored, monitored, and distributed on a fixed schedule.",
    "The facility handles intake and routing of food, water, and life-support materials.",
    "Resupply operations prioritize stability, especially in long-haul transit zones.",
    "Inventory systems ensure that basic needs are met without surplus or delay.",
    "Distribution points are maintained for routine access to essentials and medical goods.",
  ],
};

const PopulationClassFlavortext = {
  1: [
    "Operations are handled by a minimal crew, with most systems running autonomously.",
    "Staffing is lean, and activity cycles follow strict maintenance and supply routines.",
    "Most compartments remain idle unless needed for specific operations.",
    "Traffic is infrequent, and the station operates on a low-resource schedule.",
    "Internal systems are optimized for energy efficiency and minimal human oversight.",
    "Visitors are rare, and the environment is quiet and function-driven.",
    "Maintenance protocols run on long intervals, with only essential systems active.",
    "Most functions are managed by remote commands or automated schedules.",
  ],
  2: [
    "Personnel rotate through fixed shifts, maintaining essential operations around the clock.",
    "Basic services are available, though space and resources are carefully allocated.",
    "The station supports a modest staff, with shared roles and limited redundancy.",
    "Foot traffic is moderate, concentrated around core operational zones.",
    "Automation supplements human labor to balance efficiency and oversight.",
    "Facilities are functional, prioritizing core needs over comfort or scale.",
    "Operations proceed steadily, though throughput is scaled to the station’s limited capacity.",
    "Communal areas are compact, used mainly during shift transitions or brief downtime.",
  ],
  3: [
    "Personnel operate in teams across multiple sectors, ensuring smooth round-the-clock function.",
    "Services and logistics are compartmentalized, with standard operating schedules in place.",
    "The station accommodates sustained activity across a range of operational domains.",
    "Transit corridors and shared spaces remain active throughout most cycles.",
    "Facility resources are sufficient to support long-term staffing and general maintenance.",
    "Civilian and technical staff are both present, forming a stable operational backbone.",
    "Systems are balanced between automation and active oversight by specialized crews.",
    "Multiple departments coordinate to maintain reliability and throughput.",
  ],
  4: [
    "Traffic flows constantly across corridors, docks, and shared commercial spaces.",
    "Facilities include extensive services, logistics zones, and administrative tiers.",
    "The station supports a permanent population alongside frequent transient visitors.",
    "Crowd management systems operate continuously to maintain flow and access.",
    "Dedicated districts handle habitation, trade, transit, and civic functions.",
    "Maintenance and service staff work in overlapping shifts to sustain round-the-clock demand.",
    "The station runs like a small city, with all necessary infrastructure in place.",
    "Activity is constant, and logistics systems scale dynamically to meet demand.",
  ],
};

const atmosphere = [
  "Dim overhead panels cast a steady light across clean but heavily scuffed flooring.",
  "Bulkhead walls are marked with routing codes and faded hazard labels from prior cycles.",
  "A service drone glides overhead, tracing a silent maintenance route along the ceiling rail.",
  "The scent of recycled air is faintly metallic, tinged with coolant vapor from a nearby vent.",
  "A locked access hatch hums faintly with power, secured by a keypad with worn numerals.",
  "A bank of data terminals cycles through diagnostics, most of them running unattended.",
  "Crates marked for shipment sit neatly stacked beside an inactive cargo lift.",
  "Dull vibration from the station's core systems pulses through the deck plating underfoot.",
  "Screens on the wall scroll logistics manifests, arrival notices, and maintenance alerts.",
  "The corridor opens into a small common space lined with dispensers and fold-down seating.",
  "A viewport along the main passage shows docking traffic moving in slow formation.",
  "Safety warnings flash at regular intervals in multiple languages on recessed displays.",
  "A row of utility lockers bears inspection tags dated within the last local cycle.",
  "Ambient noise consists mostly of circulation fans and the occasional clunk of infrastructure adjusting.",
  "A transparent panel reveals the quiet movement of cargo tubes snaking behind the walls.",
  "The station’s emblem is stamped onto floor grates and compartment doors, worn down by traffic.",
  "A portable sanitation unit stands against the wall, its interface blinking on standby.",
  "Off-duty personnel quietly occupy one corner of the mess, sharing heatpacks and brief conversation.",
  "A sealed chamber behind reinforced glass houses equipment not currently in operation.",
  "Routing diagrams are etched directly into the wall paneling, faded from repeated updates.",
  "Pallets of standardized cargo are held in magnetic racks, waiting for routing clearance.",
  "A low hum emanates from structural support units embedded in the corridor bulkheads.",
  "Pressure seals on nearby airlocks are status-green, but one panel flickers intermittently.",
  "Industrial signage identifies sectors and hazards with clipped precision and no ornamentation.",
  "A few personal effects hang near workstations—photos, worn mugs, and tool wraps.",
  "Refrigerated storage units line one wall, each marked with itemized tracking IDs.",
  "A pair of diagnostics drones recharge at wall ports, dormant until the next cycle.",
  "Piping and conduit lines are exposed in the ceiling, labeled in color-coded bands.",
  "The air is dry and cool, mechanically controlled for energy conservation across the module.",
  "An open alcove reveals a small shrine, unattended but kept clean by passing crew.",
];
*/

// V1
/* 
const StationTypeFlavortext = {
  station: [
    "The station is equipped with a variety of services, ranging from commercial areas to residential zones.",
    "Shops, entertainment venues, and restaurants are scattered throughout the station, making it a lively place.",
    "The station serves as a major stop for travelers, with constant arrivals and departures of ships.",
    "Numerous transport connections are available, making it a key hub for trade and passenger traffic.",
    "Various industries operate within the station, providing essential goods and services to its population.",
  ],
  outpost: [
    "This small outpost has minimal facilities, offering only the basics for those passing through.",
    "The station is quiet, with only a few people working or passing through on their way to more populated locations.",
    "Its limited infrastructure makes it ideal for specific industrial tasks, such as mining or resource extraction.",
    "Few people call this outpost home, and services are mostly restricted to the necessities of survival and work.",
    "Outpost workers typically focus on specialized tasks, with little need for luxuries or distractions.",
  ],
  depot: [
    "This depot is focused on logistics, with large warehouses and storage areas for goods and resources.",
    "The constant movement of cargo creates a steady hum of activity throughout the station.",
    "Trains and cargo ships frequently dock here, unloading supplies and shipments for distribution.",
    "The station has a practical, utilitarian layout designed to handle large volumes of materials.",
    "Workers focus on coordinating the flow of goods, ensuring shipments are handled efficiently and safely.",
  ],
  relay: [
    "The relay station serves as a critical link in the communication network, ensuring data flows smoothly across space.",
    "Unseen by many, this station transmits signals and coordinates communications between distant locations.",
    "Located in a quiet corner of space, the relay station has only a handful of personnel overseeing its operations.",
    "Its main function is to maintain a constant stream of data and communication, with little in the way of social or commercial activity.",
    "There is a subdued hum from the equipment as data packets are transmitted across vast distances.",
  ],
  hub: [
    "This bustling station is the center of commerce and travel, with people constantly coming and going.",
    "Shops, restaurants, and entertainment venues are clustered in key areas, providing a range of services to travelers.",
    "The station is always busy, with people from all walks of life passing through on their way to distant destinations.",
    "In addition to its trade focus, the station provides a variety of amenities for both visitors and long-term residents.",
    "Massive docking bays accommodate a steady stream of ships, bringing goods, passengers, and travelers from across the system.",
  ],
  refinery: [
    "The refinery processes raw materials into refined products, with large industrial machines working around the clock.",
    "Loud machinery and the smell of processed ores fill the air as workers monitor the continuous flow of materials.",
    "Refined resources are shipped out regularly, fueling industries throughout the system with essential materials.",
    "The station’s focus is on extraction and purification, turning raw ore into usable materials for further production.",
    "While the station is primarily focused on industrial work, a small population lives here to support operations.",
  ],
  factory: [
    "This station is dedicated to large-scale production, with vast assembly lines running day and night.",
    "Automated machines and skilled workers produce everything from ship components to consumer goods.",
    "The factory is a hive of activity, with a constant flow of products being manufactured and shipped out.",
    "Large storage areas house materials and components, which are then processed into finished goods.",
    "A steady stream of workers and machines ensures the station remains efficient, producing goods in high volume.",
  ],
};

const StationIndustryFlavortext = {
  mining: [
    "Mining operations are conducted here, with workers extracting valuable resources from nearby asteroids.",
    "The station is a focal point for extracting minerals and ores, feeding raw materials into the greater supply chain.",
    "Massive drills and mining bots operate continuously to extract materials, often in harsh environments.",
    "Ore and other valuable resources are refined on-site or transported to nearby stations for further processing.",
    "Mining activity is constant, with workers monitoring the extraction of resources and ensuring operations run smoothly.",
  ],
  refining: [
    "The refinery processes raw materials into valuable products like metals, chemicals, and fuels.",
    "Large smelting furnaces and chemical refineries purify ores and gases, turning them into useful materials.",
    "Refining operations occur around the clock, ensuring a steady flow of materials for various industries.",
    "The air is thick with the scent of processed minerals as workers monitor the refining processes.",
    "Refined products are exported to other stations and ships, fueling manufacturing and other industrial activities.",
  ],
  manufacturing: [
    "This station produces a wide range of products, from machine components to consumer goods.",
    "The station’s production lines are continuously assembling parts, which are then shipped across the system.",
    "Manufactured goods range from small electronic components to large-scale industrial equipment.",
    "Machines work in sync with human oversight, ensuring that products meet quality standards.",
    "Materials brought in from other stations are turned into finished goods, ready for distribution.",
  ],
  assembling: [
    "The station’s primary function is to assemble products from pre-manufactured components.",
    "Workers and automated systems assemble everything from spacecraft to mechanical parts.",
    "Assembly lines work in a continuous cycle, where raw parts are turned into completed units ready for distribution.",
    "Precision tools and robots ensure that the assembly process is fast and accurate.",
    "The station is a key link in the production chain, turning parts into functional products for further use.",
  ],
  trading: [
    "The station acts as a key marketplace, where goods from across the system are bought and sold.",
    "Trade and commerce are the primary activities here, with merchants and buyers negotiating deals.",
    "A wide variety of goods, from raw materials to luxury items, are exchanged on the station’s trading floors.",
    "Shops and stalls line the walkways, offering everything from rare artifacts to essential supplies.",
    "The station's commercial districts are always busy, as traders move between the various sectors.",
  ],
  supplying: [
    "This station provides critical supplies, such as fuel, food, and equipment, for ships and colonies.",
    "Fuel depots and supply hubs ensure that ships are stocked with everything needed for long journeys.",
    "Supply ships regularly dock here to take on goods ranging from fuel to spare parts.",
    "The station’s focus is on providing essentials for spacefaring vessels, including medical supplies and food.",
    "Regular shipments ensure that the station remains stocked, helping sustain other operations across the system.",
  ],
};

const PopulationClassFlavortext = {
  1: [
    "The station has a sparse population, with only a few people around, primarily workers or essential personnel.",
    "Services are basic, catering mostly to a small number of inhabitants and passing visitors.",
    "Few people live here permanently, with most only staying for short periods of time.",
    "The station has a quiet atmosphere, with only a handful of workers tending to its minimal operations.",
    "This station has a small but dedicated crew managing its essential functions.",
  ],
  2: [
    "The station is home to a moderate number of people, with essential services provided for the population.",
    "Facilities are functional, offering basic amenities for the residents and occasional visitors.",
    "While not overcrowded, the station sees a steady flow of people, with some amenities available.",
    "There’s a sense of order here, with most services tailored to the needs of the moderate population.",
    "The station supports a variety of industries and offers a mix of services to those who live and work here.",
  ],
  3: [
    "The station has a sizable population, with services catering to both residents and travelers.",
    "A variety of shops, restaurants, and entertainment options make this station a convenient stop for visitors.",
    "The station is busy, with people constantly coming and going as part of the daily flow of commerce.",
    "Facilities are plentiful, and the station offers a range of services to support its diverse population.",
    "People from various backgrounds can be found here, contributing to the station’s diverse atmosphere.",
  ],
  4: [
    "The station is densely populated, with millions of residents and visitors passing through regularly.",
    "Every section of the station is filled with activity, from bustling markets to busy transportation hubs.",
    "Large commercial and residential districts accommodate the growing number of inhabitants.",
    "The station is a major center for trade, culture, and industry, supporting a thriving, diverse population.",
    "With a constant flow of people, the station is always busy, with bustling corridors and crowded docking bays.",
  ],
};
*/

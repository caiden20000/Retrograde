import { useState } from "react";
import { allItemTypes } from "../constants/itemTypes"
import { ItemType } from "../types/ItemType"

export default function StationMapGoodsList({onSelection}: {onSelection: (itemType: ItemType | null) => void}) {
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    function select(itemType: ItemType) {
        const newItem = selectedItem == itemType ? null : itemType;
        setSelectedItem(newItem);
        onSelection(newItem);
    }
    return <div className="station-goods-list">
        <div>{allItemTypes.map(
            itemType => (
                <GoodsListItem 
                itemType={itemType} 
                selected={selectedItem == itemType}
                onClick={()=>select(itemType)}
                />
                )
            )}</div>
    </div>
}

function GoodsListItem({itemType, selected, onClick}: {itemType: ItemType; selected: boolean; onClick: ()=>void}) {
    return <div className={"goods-list-item" + (selected ? " selected" : "")} onClick={onClick}>{itemType.name}</div>
}
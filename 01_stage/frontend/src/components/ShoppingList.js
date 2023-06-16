import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

const ShoppingList = (props) => {
    console.log("SL #7 props=",props)
    const [state,setState] = useState({
        removeIndex:-1,
        editIndex:-1
    })

    console.log("SL #13 props.list=",props.list)

    const changeMode  = (mode,index) => {
        if(mode === "remove") {
            setState({
                removeIndex:index,
                editIndex:-1
            })
        }
        if(mode === "edit"){
            setState({
                removeIndex:-1,
                editIndex:index
            })
        }
        if(mode === "cancel"){
            setState({
                removeIndex:-1,
                editIndex:index
            })
        }
    }

    const removeItem = (id) => {
        props.removeItem(id);
        changeMode("cancel");
    }

    const editItem = (id) => {
        props.editItem(id);
        changeMode("cancel");
    }

    console.log("SL #44 editItem=",editItem)
    console.log("SL #45 props.list=",props.list)
    let items = props.list.map((item,index) => {
        if(index === state.removeIndex) {
            return (
                <RemoveRow key={item._id} item={item} changeMode={changeMode} removeItem={removeItem}/>
            )
        }
        if(index === state.editIndex) {
            return (
                <EditRow key={item._id} item={item} changeMode={changeMode} editItem={editItem}/>
            )
        }

        return (
            <Row key={item._id} item={item} index={index} changeMode={changeMode}/>
        )
    })

    //Otsiko ja listan!
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>auction_name</th>
                    <th>auction_starttime</th>
                    <th>auction_endtimeice</th>
                    <th>Remove</th>
                    <th>Edit</th>
                </tr>
            </thead>
            {/*  Listan tulostus */}
            <tbody>
                {items}
            </tbody>
        </table>
    )
}

export default ShoppingList;

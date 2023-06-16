import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

const HuutokauppaList = (props) => {
    console.log("HL ###7 props.list=",props.list)

    const [state,setState] = useState({
        removeIndex:-1,
        editIndex:-1
    })

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

    console.log("###34 changeMode=",changeMode)
    const removeItem = (id) => {
        props.removeItem(id);
        changeMode("cancel");
    }

    const editItem = (id) => {
        props.editItem(id);
        changeMode("cancel");
    }

   console.log("###45 editItem=",editItem)
   console.log("###46 props=",props)
    let items = props.list.map((item,index) => {
         console.log("###47 state.removeIndex=",state.removeIndex)
        
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

   console.log("###63 items=",items)

    //Otsiko ja listan!
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {/* <th>Type</th> */}
                    {/* <th>Count</th> */}
                    {/* <th>Price</th> */}
                    <th>auction_name</th>
                    <th>auction_starttime</th>
                    <th>auction_endtime</th>
                    <th>auction_desription</th>
                    <th>auction_adress</th>
                    <th>auction_phone</th>
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

export default HuutokauppaList;

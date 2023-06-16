import {useState} from 'react';

const ShoppingForm = (props) => {
	console.log("SF ###4 props=",props)
	console.log("SF ###5 props.addItem=",props.addItem)
	console.log("SF ###4 props.list=",props.list)
	
	const [state,setState] = useState({
		type:"",
		count:0,
		price:0
		// auction_name:"",
		// auction_starttime:"",
		// auction_endtime:"",
		// auction_desription:"",
		// auction_adress:"",
		// auction_phone:""		
	})
	
	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		let item = {
			...state
		}
		props.addItem(item);
		setState({
			type:"",
			count:0,
			price:0
			// auction_name:"",
			// auction_starttime:"",
			// auction_endtime:"",
			// auction_desription:"",
			// auction_adress:"",
			// auction_phone:""		
			})
		console.log("SF ###42 props.list=",props.list)
		console.log("SF ###43 props=",props)
	}
	
	return(
		<div style={{
			"backgroundColor":"lightblue",
			"margin":"auto",
			"width":"40%",
			"textAlign":"center"
		}}>
			<form className="mb-5" onSubmit={onSubmit}>
				<label htmlFor="type" className="form-label">Type:</label>
				<input type="text"
						className="form-control"
						name="type"
						id="type"
						onChange={onChange}
						value={state.type}/>
				<label htmlFor="count" className="form-label">Count:</label>
				<input type="number"
						className="form-control"
						name="count"
						id="count"
						onChange={onChange}
						value={state.count}/>
				<label htmlFor="price" className="form-label">Price:</label>
				<input type="number"
						className="form-control"
						name="price"
						id="price"
						step="0.01"
						onChange={onChange}
						value={state.price}/>
				<input type="submit" className="btn btn-primary" value="Add"/>
			</form>
		</div>
	)
}

export default ShoppingForm;
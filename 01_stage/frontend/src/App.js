import './App.css';
import {useState,useEffect} from 'react';
import HuutokauppaForm from './components/HuutokauppaForm';
import HuutokauppaList from './components/HuutokauppaList';
// import ShoppingForm from './components/ShoppingForm';
// import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';

function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	useEffect(() => {
		getList();
	},[])
	
	//USEEFFECT
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}

			console.log("App #34 urlRequest.url: ", urlRequest.url)
			//console.log("Testi #35 response.ok", response.ok)
			console.log("App #36 urlRequest.action: ", urlRequest.action) //additem!

			const response = await fetch(urlRequest.url,urlRequest.request);
			if(!response) {
				console.log("No response #38.");
				return;
			}

			console.log("App #45 response.ok: ", response.ok) //additem!
			console.log("App #45 response: ", response) //additem!
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							//console.log("Testi #48 data", data.item.HuutokauppaForm.item.element.)
							
							return;
						}
						setState({
							list:data
						})
						return;
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
						return;
					default:
						return;
				}
			} else {
				console.log("#61: Server responded with a status "+response.status+" "+response.statusText);
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	//REST API
	console.log("App Testi #74: ")
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				"method":"GET"
			},
			action:"getlist"			
		})
	}
	
	console.log("Testi #85: ", getList)

	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	console.log("Testi #101", addItem)
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				"method":"DELETE"
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item._id,
			request:{
				"method":"PUT",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	console.log("Testi #122: ", editItem)

	return (
		<div className="App">
			<Navbar/>
			<Routes>	
				{/* <Route path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addItem=	{addItem}/>}/> */}
				<Route path="/" element={<HuutokauppaList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				{/* <Route path="/HuutokauppaList" element={<HuutokauppaList addItem={addItem}/>}/> */}
				<Route path="/HuutokauppaForm" element={<HuutokauppaForm addItem={addItem}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
	);
}

export default App;
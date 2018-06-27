

export const loadState = () => {

	try{
		const serializedState = localStorage.getItem('state')
		if(serializedState === null){
			return undefined //devolvemos "undefined" y caga el state del reducer.
		}

		//devolvemos el state guardado en localStorage
		return JSON.parse(serializedState)

	} catch(err){
		return undefined //devolvemos "undefined" y caga el state del reducer.
	}
}


export const saveState = (state) => {
	try{
		const serializedState = JSON.stringify(state)
		localStorage.setItem('state', serializedState)
	} catch(err){
		//Ignoramos escribir o guardar errores
	}
}
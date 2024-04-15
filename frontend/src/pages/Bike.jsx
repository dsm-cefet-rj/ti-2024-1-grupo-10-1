import React from 'react'
import HeaderHome from '../components/HeaderHome'
import ListaBikes from '../components/ListaBikes'
import Options from '../components/Options'
import useBikeStore from '../store'; //hook do Zustand


/*1
<HeaderHome></HeaderHome>
<Options></Options>
<ListaBikes></ListaBikes>
*/

function Bike() {
	const selectedBikeType = useBikeStore(state => state.selectedBikeType); // Obtendo o valor de selectedBikeType do estado global
	
	return (
		<div>
			<HeaderHome />
			<Options />
			<ListaBikes selectedBikeType={selectedBikeType} />
		</div>
	);
}



export default Bike

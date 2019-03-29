
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Welcome from '../alert/Welcome'
import StackedBarChart from './StackedBarChartTab3'
import StackedBarDiffChart from './StackedBarDiffChartTab3'

const MainArea = styled.div`
  flex: 1;
  padding: 20px;
  `;
  MainArea.displayName = 'MainArea';
const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: ${props => (props.direction==='column' ? 'column' : 'row')};
  `;
  Flex.displayName = 'Flex';
const Charts = (props) => {
  const selectedScenario = props.scenarioSelection.scenarioSelection;
  const selectedScenario2 = props.scenarioSelection.scenarioSelection2;

  return(
    <MainArea>
      {(props.scenarioSelection.showWelcome===true) && <Welcome closeWelcome={props.closeWelcome} />}
        {(props.scenarioSelection.showDifference===false || (props.scenarioSelection.showDifference===true && selectedScenario2==="")) && 
          <Flex>
            <StackedBarChart chartName='_Energi forbrug i Danmark' chartTitle='Danmarks samlede energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={1000} />
            <StackedBarChart chartName='_Olie og gas produktion' chartTitle='Olie og gas produktionen' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={500} />
            <StackedBarChart chartName='_Biobrændsels forbrug' chartTitle='Biobrændselsforbruget' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={500} />
            <StackedBarChart chartName='_Import_eksport biobrændsler' chartTitle='Import/eksport biomasse og biobrændsler' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-40} maxY={220} />
            <StackedBarChart chartName='_Forbrug VE raffinaderier' chartTitle='Brændselsforbrug på VE raffinaderier' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={300} />
            <StackedBarChart chartName='_VE-raffinaderi output' chartTitle='VE-raffinaderi output' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={160} />
            <StackedBarChart chartName='_El og varme sektorens brændse' chartTitle='El og varmesektorens brændselsforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={500} />
            <StackedBarChart chartName='_Transport sektorens energifor' chartTitle='Transportsektorens energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={300} />
            <StackedBarChart chartName='_Industriens energiforbrug' chartTitle='Industriens energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={500} />
            <StackedBarChart chartName='_Husholdningers varmeforbrug' chartTitle='Husholdningernes energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={0} maxY={180} />
          </Flex>
        }
        {(props.scenarioSelection.showDifference===true && selectedScenario2!=="") && 
          <Flex>
            <StackedBarDiffChart chartName='_Energi forbrug i Danmark' chartTitle='Danmarks samlede energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-200} maxY={200} />
            <StackedBarDiffChart chartName='_Olie og gas produktion' chartTitle='Olie og gas produktionen' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-100} maxY={100} />
            <StackedBarDiffChart chartName='_Biobrændsels forbrug' chartTitle='Biobrændselsforbruget' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-100} maxY={100} />
            <StackedBarDiffChart chartName='_Import_eksport biobrændsler' chartTitle='Import/eksport biomasse og biobrændsler' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-100} maxY={100} />
            <StackedBarDiffChart chartName='_Forbrug VE raffinaderier' chartTitle='Brændselsforbrug på VE raffinaderier' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" label2="Netto eksport (PJ)" minY={-200} maxY={200} />
            <StackedBarDiffChart chartName='_VE-raffinaderi output' chartTitle='VE-raffinaderi output' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-100} maxY={100} />
            <StackedBarDiffChart chartName='_El og varme sektorens brændse' chartTitle='El og varmesektorens brændselsforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-200} maxY={200} />
            <StackedBarDiffChart chartName='_Transport sektorens energifor' chartTitle='Transportsektorens energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-100} maxY={100} />
            <StackedBarDiffChart chartName='_Industriens energiforbrug' chartTitle='Industriens energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-100} maxY={100} />
            <StackedBarDiffChart chartName='_Husholdningers varmeforbrug' chartTitle='Husholdningernes energiforbrug' selectedScenario={selectedScenario} selectedScenario2={selectedScenario2} combinedChart={false} label="PJ" minY={-10} maxY={10} />
          </Flex>
        }        
    </MainArea>
  );
}

Charts.propTypes = {
  scenarioSelection: PropTypes.object.isRequired,
  closeWelcome: PropTypes.func.isRequired
}

export default Charts;
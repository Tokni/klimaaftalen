import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import LeftMenu from "./leftMenu/LeftMenu";
import LeftMenuMobile from "./leftMenu/LeftMenu.mobile";
import Tabs from "./tabs/Tabs";
import TabsMobile from "./tabs/Tabs.mobile";
import Charts from "./charts/Charts";
import ChartsTab2 from "./charts/ChartsTab2";
import ChartsTab3 from "./charts/ChartsTab3";
import ChartsTab4 from "./charts/ChartsTab4";
import ChartsTab5 from "./charts/ChartsTab5";
import ChartsTab6 from "./charts/ChartsTab6";
import About from "./pages/About";
import PageRenderer from "./pages/PageRenderer";
import Prerequisites from "./pages/Prerequisites";
import scenarioCombinations from "./data/scenarioCombinations";
import stackedBar from "./data/stackedBar";
import { withTranslation } from 'react-i18next';
import dk from "./translations/dk"
import en from "./translations/en"
import FullScreenChart from "./charts/FullScreenChart";


ReactGA.initialize("UA-127032810-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const Page = styled.div`
  height: 100%;
  margin: 0px;
  display: flex;
  box-sizing: border-box;
`;
const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  flex-grow: 1; /*ensures that the container will take up the full height of the parent container*/
  overflow-y: auto; /*adds scroll to this container*/
  overflow-x: hidden;
`;
const MainSwitch = styled(Switch)`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  
`;

export const changeScenario = (name, value, chartName) => ({
  [name]: value,
  showFullName: chartName
});

const default_scenario = "FP_NO_WIN_INT";
const default_tab = "overview"

export class App extends React.Component {
  constructor(props) {
    super(props);
    var selections = props.location.pathname.split('/')
    let CCS = false
    let DIFF = false
    let FULL = ''
    //alert("selections: " + JSON.stringify(selections))
    this.props.i18n.changeLanguage(selections[1])
    selections.forEach(
      (select, index) => {
        if (select === 'CCS') {
          selections[index] = undefined
          CCS = true
        }
        if (select === 'Diff') {
          selections[index] = undefined
          DIFF = true
        }
        if (select === 'Chart') {
          selections[index] = undefined
          FULL = selections[index + 1]
          //FULL = "/Chart"
        }
        if (select === 'About') {
          selections[index] = 'Overblik'
        }
      }
    )
    
    this.state = {
      tabSelection: this.getTabSelection(selections[2]),
      scenarioSelection: this.getScenarioSelection(selections[3], CCS),
      scenarioSelection2: this.getScenarioSelection2(selections[4], CCS),
      showWelcome: true,
      showDifference: DIFF,
      showCCS: CCS,
      showFullName: this.getChartNameSelection(FULL)
    };
    //alert("state: " + JSON.stringify(this.state))
    this.scenarioCombinations = scenarioCombinations.scenarioCombinations;
  }

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
  };

  
  changeCurrentLanguage = (language) => {
    this.setState({changeLanguageTo: language})
  }
  
  getScenarioSelection = (sel, ccs) => {
    //alert("sel: " + JSON.stringify(sel))
    let ret
    if (sel !== undefined) {
      let ccsStr =''
      if(ccs) ccsStr='_With_CCS'
      if (this.props.i18n.language === 'en') {
        ret = Object.entries(en.scenarioRoutes).find(r => (
          r[1] === "/" + sel
          )
        )[0] + ccsStr
      } else {
        ret =  Object.entries(dk.scenarioRoutes).find(r => (
          r[1] === "/" + sel
          )
        )[0] + ccsStr
      }
    }
    else  
      ret = default_scenario
    //alert("ret: " + ret)
    return ret
  }
  getScenarioSelection2 = (sel,ccs) => {
    let ret
    //console.log("sel: " + sel)
    if (sel !== undefined) {
      let ccsStr =''
      if(ccs) ccsStr='_With_CCS'
      if (this.props.i18n.language === 'en') {
        ret =  Object.entries(en.scenarioRoutes).find(r => (
          r[1] === "/" + sel
          )
        )[0] + ccsStr
      } else {
        ret =  Object.entries(dk.scenarioRoutes).find(r => (
          r[1] === "/" + sel
          )
        )[0] + ccsStr
      }
    }
    else  
      ret =  ''

    //alert("ret2:" + ret)
    return ret
  }
  getTabSelection = (sel) => {
    let ret
    if (sel !== undefined) {
      if (this.props.i18n.language === 'en') {
        ret =  Object.entries(en.tabRoutes).find(r => (
          r[1] === "/" + sel
          )
        )[0] 
      } else {
        ret =  Object.entries(dk.tabRoutes).find(r => (
          r[1] === "/" + sel
          )
        )[0]
      }
    }
    else  
      ret =  default_tab

    return ret

  }
  getChartNameSelection = (name) => {
    let ret = {}
    //console.log("ChartName_____________________: " + name)
    if (name !== '') {
      if (this.props.i18n.language === 'en') {
        ret.title =  Object.entries(en.chartRoutes).find(r => (
          r[1] === name
          )
        )[0] 
        ret.name =  Object.entries(en.chartNames).find(r => (
          r[1] === name
          )
        )[0] 
      } else {
        ret.title =  Object.entries(dk.chartRoutes).find(r => (
          r[1] === name
          )
        )[0]
        ret.name =  Object.entries(dk.chartNames).find(r => (
          r[1] === name
          )
        )[0]
      }
    } else {
      ret = ''
    }
    return ret
  } 
  UpdateTabSelection = (tab) => {
    this.setState({"tabSelection": tab });
  }

  UpdateScenarioSelection = (e, name, value) => {
    let newChartName = ''
    if (name !== undefined) {
      //newChartName = "/Chart/" + cname
      newChartName = this.getChartNameSelection(name)
    }
    if (this.state.scenarioSelection2 !== "") {
      if (value === this.state.scenarioSelection) {
        this.setState(
          changeScenario("scenarioSelection", this.state.scenarioSelection2, newChartName)
        );
        this.setState(changeScenario("scenarioSelection2", "", newChartName));
      } else {
        if (value === this.state.scenarioSelection2) {
          this.setState(changeScenario("scenarioSelection2", "", newChartName));
        } else {
          this.setState(changeScenario("scenarioSelection2", value, newChartName));
        }
      }
    } else {
      if (value !== this.state.scenarioSelection) {
        this.setState(changeScenario("scenarioSelection2", value, newChartName));
      }
    }
  };
  changeFullScreenStatus = (chartName) => {
    //alert("changing to " + chartName + "  " + this.props.t("chartRoutes." + chartName))
    this.setState({showFullName: '/Chart/' + this.props.t("chartRoutes." + chartName)})
  };
  CloseWelcomeWidget = () => {
    //alert("closin ")
    this.setState({ showWelcome: false });
  };

  ToggleDifference = e => {
    e.preventDefault();
    this.setState({ showDifference: !this.state.showDifference });
  };

  ToggleShowCCS = (e, cname) =>{
    //alert("TCCS: " + cname)
    e.preventDefault();
    let newChartName = ''
    let newScenario = "";
    let newScenario2 = "";
    const oldScenario = this.state.scenarioSelection;
    const oldScenario2 = this.state.scenarioSelection2;
    if (cname !== undefined) {
      //newChartName = "/Chart/" + cname
      newChartName = this.getChartNameSelection(cname)
    }
    if (this.state.showCCS) {
      newScenario = oldScenario.substring(0, oldScenario.length - 9);
      if (oldScenario2 !== "") {
        newScenario2 = oldScenario2.substring(0, oldScenario2.length - 9);
      }
    } else {
      newScenario = oldScenario + "_With_CCS";
      if (oldScenario2 !== "") {
        newScenario2 = oldScenario2 + "_With_CCS";
      }
    }
    //alert("newChartName: " + JSON.stringify(newChartName))
    this.setState({
      showCCS: !this.state.showCCS,
      scenarioSelection: newScenario,
      scenarioSelection2: newScenario2,
      showFullName: newChartName
    });
  };
  componentDidUpdate(prevProps, prevState) {
    
  }
  
  render() {
    //console.log("location: " + JSON.stringify(this.props.location))
    const {t } = this.props;
    let sce1 = "", sce2 = "", ccs = '', diff = ''
    if (this.state.scenarioSelection !== "") sce1 = t("scenarioRoutes." + this.state.scenarioSelection)
    if (this.state.scenarioSelection2 !== "") sce2 = t("scenarioRoutes." + this.state.scenarioSelection2)
    if (this.state.showCCS === true) ccs = '/CCS'
    if (this.state.showDifference === true) diff = '/Diff'
    console.log("FullName: " + JSON.stringify(this.state.showFullName))
    let postRoute = sce1 + sce2 + ccs + diff
    let chartRoute = ''
    if(this.state.showFullName !== '')
      chartRoute = t("chartRoutes." + this.state.showFullName.title)
      //alert("ChartName: " + JSON.stringify(this.state.showFullName))
    //if(chartRoute === 'chartRoutes.undefined') 
      //alert("ch undef")
    /* if (this.props.location.state)
      chartRoute = this.props.location.pathname */
    //let postRoute = sce1 + sce2 + ccs + diff + this.state.showFullName;
    console.log("postRoute: " + postRoute + "   chartRoute: " + JSON.stringify(chartRoute))
    let preRoute = '/' + this.props.i18n.language
    return (
      <Page>
        <Column>
          <Content>
            <LeftMenu
              selectedChartgroup={this.state.scenarioSelection}
              scenarioSelection={this.state}
              scenarioCombinations={this.scenarioCombinations}
              updateScenarioSelection={this.UpdateScenarioSelection}
              toggleDifference={this.ToggleDifference}
              toggleShowCCS={this.ToggleShowCCS}
              tabSelection={this.state.tabSelection}
              preRoute={preRoute}
            />
            <LeftMenuMobile
              selectedChartgroup={this.state.scenarioSelection}
              scenarioSelection={this.state}
              scenarioCombinations={this.scenarioCombinations}
              updateScenarioSelection={this.UpdateScenarioSelection}
              toggleDifference={this.ToggleDifference}
              toggleShowCCS={this.ToggleShowCCS}
              backRoute={postRoute}
              tabSelection={this.state.tabSelection}
            />
          </Content>
        </Column>
        <Column style={{flex:1}}>
          <Content>
            <Tabs selectedChartgroup={this.props.location.pathname} 
              UpdateTabSelection={this.UpdateTabSelection}
              backRoute={postRoute}
              preRoute={preRoute}
              tabSelection={this.tabSelection}
              match={this.props.match}
              location={this.props.location}
              history={this.props.history}
            />
            <TabsMobile selectedChartgroup={this.props.location.pathname} />
            <MainSwitch>
            <Route
                exact
                path="/"
                render={() => {
                  return ( 
                  <Redirect to={
                    preRoute + 
                    this.props.t("tabRoutes.overview") 
                    + this.props.t("scenarioRoutes.FP_NO_WIN_INT")
                  }/>
                )}} />
              <Route
                exact
                path={preRoute + t("tabRoutes.overview") + postRoute }
                render={() => (
                  <Charts
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                    changeFullScreenStatus={this.changeFullScreenStatus}
                  />
                )}
              />
              <Route
              exact
                path={preRoute + this.props.t("tabRoutes.mainresults")  + postRoute }
                render={() => (
                  <ChartsTab2
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
              exact
                path={preRoute + this.props.t("tabRoutes.supplysector")  + postRoute }
                render={() =>{
                  return (
                    <ChartsTab3
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}}
              />
              <Route
              exact
                path={preRoute + this.props.t("tabRoutes.transportsector")  + postRoute }
                render={() => (
                  <ChartsTab4
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
              exact
                path={preRoute + this.props.t("tabRoutes.industry")  + postRoute }
                render={() => (
                  <ChartsTab5
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              <Route
              exact
                path={preRoute + this.props.t("tabRoutes.households")  + postRoute }
                render={() => (
                  <ChartsTab6
                    scenarioSelection={this.state}
                    closeWelcome={this.CloseWelcomeWidget}
                  />
                )}
              />
              {
                
              }
              <Route path={preRoute + "/about"} component={About} />
              <Route
                path="/beskrivelser"
                render={() => {
                  return (
                    <PageRenderer
                      markdownFiles={[
                        "descriptions/0_intro.md",
                        "descriptions/1_basicscenarios.md",
                        "descriptions/2_enhedslisten.md",
                        "descriptions/3_socialistiskfolkeparti.md",
                        "descriptions/4_radikalevenstre.md",
                        "descriptions/5_socialdemokratiet.md",
                        "descriptions/6_alternativet.md",
                        "descriptions/7_regeringen.md"
                      ]}
                    />
                  );
                }}
              />
              <Route path={preRoute + "/forudsaetninger"} component={Prerequisites} />
              <Route path={preRoute + "/abonner"} render={() => {
                  return (
                    <PageRenderer
                      markdownFiles={[   
                        "descriptions/subscribe.md"
                      ]}
                    />
                  );
                }} />
                {stackedBar.data.scenarios.forEach(scen => {
                  scen.indicators.forEach(i => {
                    i.indicatorGroups.forEach(ig => {
                    })
                    
                  })
                })}
              <Route 
                //path={preRoute + t("tabRoutes." + this.state.tabSelection) + postRoute + chartRoute}
                path={preRoute + t("tabRoutes." + this.state.tabSelection) + postRoute + '/Chart'}
                render={routeProps =>{ 
                  return (<FullScreenChart 
                    routeProps={routeProps}
                    chartName={this.state.showFullName !== '' ? this.state.showFullName.name : ''}
                    chartTitle={this.state.showFullName !== '' ? this.state.showFullName.title : ''}
                    scenarioSelection={this.state.scenarioSelection}
                    scenarioSelection2={this.state.scenarioSelection2}
                    backRoute={postRoute}
                    tabSelection={this.state.tabSelection}
                    showDifference={this.state.showDifference}
                  />)}
                }/>
              <Redirect to={
                this.state.showFullName !=='' ? 
                  preRoute + t("tabRoutes." + this.state.tabSelection) + postRoute + "/Chart/" + chartRoute :
                  preRoute + t("tabRoutes." + this.state.tabSelection) + postRoute
                //preRoute + t("tabRoutes." + this.state.tabSelection) + postRoute
              } />
            </MainSwitch>
          </Content>
        </Column>
      </Page>
    );
  }
}
App.propTypes = {
  t: PropTypes.any,
  match: PropTypes.any,
  i18n: PropTypes.any
}

export default withTranslation()(withRouter(App));

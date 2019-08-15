import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { Link, withRouter } from "react-router-dom";
import ScenarioSelectionList from "../scenarioSelection/ScenarioSelectionList";
import ToggleSwitch from "./ToggleSwitch";
import { useTranslation } from "react-i18next";

const MenuLayout = styled.div`
  display: none;
  ${breakpoint("desktop")`
    display: flex;  
    min-height: 100vh;
    flex-direction: column;
    flex-shrink: 0;
    width: 220px;
    color: white;
    background: rgb(50, 50, 50);
    visibility: visible;
  `}
`;

const MenuHeader = styled.div`
  padding: 10px 12px 5px 0px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: top;
`;

const MenuHeaderLeft = styled.div`
  padding: 0 12px 5px 0px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const MenuHeaderRight = styled.div`
  padding: 0 12px 5px 0px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: right;
`;

const AppLogo = styled.img`
  width: 45px;
  height: 67px;
  margin-left: 5px;
  border: 0;
`;

const MenuTitle = styled(Link)`
  font-weight: bold;
  font-size: 1.25em;
  padding: 0px 0px 5px 15px;
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
`;

const MenuSeparatorLine = styled.hr`
  margin: 0.25em 12px 0.25em 15px;
  border-color: #555;
  border-width: 1px;
  width: 100hh;
`;

const MenuRoutes = styled.div`
  padding: 10px 12px 15px 15px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled(Link)`
  font-weight: ${props => (props.selected ? "bold" : "normal")};
  font-size: 1em;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  color: ${props => (props.selected ? "yellow" : "inherit")};
`;

const ScenarioSelection = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const ToggleDifference = styled.div`
  padding: 15px;
  display: flex;
  justify-content: start;
  align-content: center;
`;

const ToggleSwitchText = styled.div`
  color: ${props =>
    props.singleMode ? "gray" : props.selected ? "#2196F3" : "white"};
  margin-left: 10px;
`;

const ToggleLanguageText = styled.div`
  color: ${props => (props.selected ? "white" : "gray")};
  margin-left: 10px;
  margin-right: 10px;
`;

const ScenarioDifferenceText = styled.div`
  font-size: 0.7em;
  color: ${props =>
    props.singleMode ? "gray" : props.selected ? "#2196F3" : "white"};
  margin-left: 60px;
  margin-bottom: 10px;
`;

const MenuFooter = styled.div`
  padding: 15px 12px 5px 15px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CopyrightNotice = styled.div`
  padding: 0 12px 5px 15px;
  margin: 0;
  width: 100%;
  heigth: 26px;
`;

const ExternalLink = styled.a`
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

function ScenarioSelectionMenu(props) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const toggleLanguage = e => {
    e.preventDefault();
    if (language === "en") {
      i18n.changeLanguage("dk");
    } else {
      i18n.changeLanguage("en");
    }
  };
  //console.log("___match___from__leftmenu: " + JSON.stringify(props.match))
  //console.log("___history___from__leftmenu: " + JSON.stringify(props.history))
  //console.log("___location___from__leftmenu: " + JSON.stringify(props.location))
  //console.log("scenarioSelectionLink: " + props.tabSelection + props.backRoute )
  return (
    <MenuLayout>
      <MenuHeader>
        <MenuHeaderLeft>
          <MenuTitle to="/">{t("title")}</MenuTitle>
          <MenuRoutes>
            <MenuItem
              to="/about"
              selected={props.selectedChartgroup === "/about"}
            >
              {t("menu.desktop.about")}
            </MenuItem>
            <MenuItem
              to="/beskrivelser"
              selected={props.selectedChartgroup === "/beskrivelser"}
            >
              {t("menu.desktop.descriptions")}
            </MenuItem>
            <MenuItem
              to="/forudsaetninger"
              selected={props.selectedChartgroup === "/forudsaetninger"}
            >
              {t("menu.desktop.preconditions")}
            </MenuItem>
            <MenuItem
              to="/abonner"
              selected={props.selectedChartgroup === "/abonner"}
            >
              {t("menu.desktop.subscribe")}
            </MenuItem>
          </MenuRoutes>
        </MenuHeaderLeft>
        <MenuHeaderRight>
          <AppLogo src="./images/dtulogo_white.png" alt="logo" />
        </MenuHeaderRight>
      </MenuHeader>
      <MenuSeparatorLine />
      <ScenarioSelection>
        <ScenarioSelectionList
          updateScenarioSelection={props.updateScenarioSelection}
          name="scenarioSelection"
          selectedValue={props.scenarioSelection.scenarioSelection}
          selectedValue2={props.scenarioSelection.scenarioSelection2}
          dimensionOptions={props.scenarioCombinations.scenarioOptions}
          dimensionTitle={t("general.scenarios")}
          narrowVersion={false}
          showCCS={props.scenarioSelection.showCCS}
          backRoute={props.backRoute}
          tabSelection={props.tabSelection}
        />
      </ScenarioSelection>
      <MenuSeparatorLine />
      <ToggleDifference onClick={e => props.toggleShowCCS(e)}>
        <ToggleSwitch
          dimmed={false}
          checked={props.scenarioSelection.showCCS}
        />
        <ToggleSwitchText selected={props.scenarioSelection.showCCS}>
          {t("general.CCS")}
        </ToggleSwitchText>
      </ToggleDifference>
      <MenuSeparatorLine />
      <ToggleDifference onClick={e => props.toggleDifference(e)}>
        <ToggleSwitch
          dimmed={props.scenarioSelection.scenarioSelection2 === ""}
          checked={props.scenarioSelection.showDifference}
        />
        <ToggleSwitchText
          singleMode={props.scenarioSelection.scenarioSelection2 === ""}
          selected={props.scenarioSelection.showDifference}
        >
          {t("general.scenario-difference")}
        </ToggleSwitchText>
      </ToggleDifference>
      <ScenarioDifferenceText
        singleMode={props.scenarioSelection.scenarioSelection2 === ""}
        selected={props.scenarioSelection.showDifference}
      >
        {t("general.green-minus-red")}
      </ScenarioDifferenceText>
      <MenuSeparatorLine />
      <ToggleDifference 
        onClick={e => toggleLanguage(e)}>
        <ToggleLanguageText selected={language === "dk"}>
          Danish
        </ToggleLanguageText>
        <ToggleSwitch checked={language !== "dk"} dimmed={false} />
        <ToggleLanguageText selected={language === "en"}>
          English
        </ToggleLanguageText>
      </ToggleDifference>
      <MenuSeparatorLine />
      <MenuFooter>
        <CopyrightNotice>
          <ExternalLink href="http://www.tokni.com">
          {t("general.developed-by-Tokni")}
          </ExternalLink>
        </CopyrightNotice>
      </MenuFooter>
    </MenuLayout>
  );
}

ScenarioSelectionMenu.propTypes = {
  selectedChartgroup: PropTypes.string.isRequired,
  updateScenarioSelection: PropTypes.func.isRequired,
  scenarioSelection: PropTypes.object.isRequired,
  scenarioCombinations: PropTypes.object.isRequired,
  toggleDifference: PropTypes.func.isRequired,
  toggleShowCCS: PropTypes.func.isRequired,
  backRoute: PropTypes.string.isRequired,
  tabSelection: PropTypes.any
};

export default withRouter(ScenarioSelectionMenu);

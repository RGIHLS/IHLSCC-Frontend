import * as React from "react";
const Header = require("./Header").default;
import HeroList, { HeroListItem } from "./HeroList";
import { getClauses } from "../../actions/clauses.js";
const Progress = require("./Progress").default;

/* global Word, require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  listItems: HeroListItem[];
}

/**
 * The main component of the add-in, responsible for rendering the UI and handling user interactions.
 */
export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {}

  onClick = async (selectedValue: string) => {
    try {
      const results = await Promise.all([
        getClauses(selectedValue),
        // Add additional requests here if needed
      ]);

      const listItems = results[0].map(({ _id, Body = "No body", Name = "No name", Type = "No type" }) => ({
        id: _id,
        primaryText: Body,
        type: Type,
        name: Name,
      }));

      this.setState({
        listItems,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the change event of the dropdown and calls the corresponding click function based on the selected value.
   * @param event - The change event of the dropdown.
   */
  handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case "uss":
      case "cppib":
      case "ifm":
      case "mvCredit":
      case "solon":
      case "saffrey":
      case "arcus":
      case "thisIsTestRG":  
      case "any":
        this.onClick(selectedValue);
        break;
      default:
        break;
    }
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/SmallLogo-orange.jpg")}
          message="Please sideload your addin to see app body."
        />
      );
    }

    return (
      <div className="ms-welcome">
        <Header logo={require("./../../../assets/HeaderLogo-Orange.jpg")} title={this.props.title} message="Welcome" />
        <HeroList message="Select from the options below" items={this.state.listItems}>
          <p className="ms-font-l">
            Please Select one of the clients below to insert the relevant information into the document.
          </p>

          <select onChange={this.handleDropdownChange}>
            <option value="uss">USS</option>
            <option value="thisIsTestRG">thisIsTestRG</option>
            <option value="cppib">CPPIB</option>
            <option value="ifm">IFM</option>
            <option value="mvCredit">MV CREDIT</option>
            <option value="solon">SOLON</option>
            <option value="saffrey">SAFFREY</option>
            <option value="arcus">ARCUS</option>
            <option value="any">ANY</option>
          </select>
        </HeroList>
      </div>
    );
  }
}
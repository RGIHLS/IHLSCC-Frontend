import { DefaultButton } from "@fluentui/react";
import React from "react";

/**
 * Interface for an item in the HeroList component.
 */
export interface HeroListItem {
  id: string;
  primaryText: string;
  type: string;
  name: string;
}

/**
 * Props for the HeroList component.
 */
export interface HeroListProps {
  message: string;
  items: HeroListItem[];
  children: any;
}

/**
 * A component that displays a list of hero items.
 */
export default class HeroList extends React.Component<HeroListProps> {
  /**
   * Renders the component.
   * @returns The rendered component.
   */
  render() {
    const { children, items, message } = this.props;
    const infoItems = items.filter((item) => item.type === "information");
    const clauseItems = items.filter((item) => item.type === "clause");
    const commentItems = items.filter((item) => item.type === "comment");
    const clauseListItems = clauseItems.map((item, index) => (
      <li className="ms-ListItem" key={index}>
        <DefaultButton text={item.name} onClick={() => this.paraClick(item.type, item.primaryText)} />
      </li>
    ));
    const commentListItems = commentItems.map((item, index) => (
      <li className="ms-ListItem" key={index}>
        <DefaultButton text={item.name} onClick={() => this.paraClick(item.type, item.primaryText)} />
      </li>
    ));
    const infoListItems = infoItems.map((item, index) => (
      <li className="ms-ListItem" key={index}>
        <DefaultButton text={item.name} onClick={() => this.paraClick(item.type, item.primaryText)} />
      </li>
    ));

    console.log(clauseListItems);
    console.log(commentListItems);
    console.log(infoListItems);

    return (
      <main className="ms-welcome__main">
        <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">{message}</h2>
        <h2 className="ms-font-l ms-fontWeight-semibold ms-fontColor-neutralPrimary ms-u-slideUpIn20">
          Information Items
        </h2>
        <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{infoListItems}</ul>
        <h2 className="ms-font-l ms-fontWeight-semibold ms-fontColor-neutralPrimary ms-u-slideUpIn20">Clause Items</h2>
        <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{clauseListItems}</ul>
        <h2 className="ms-font-l ms-fontWeight-semibold ms-fontColor-neutralPrimary ms-u-slideUpIn20">Comment Items</h2>
        <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{commentListItems}</ul>
        {children}
      </main>
    );
  }

  /**
   * Handles the click event for a list item.
   * @param type - The type of item clicked.
   * @param pText - The primary text of the item clicked.
   * @returns A promise that resolves when the operation is complete.
   */
  paraClick = async (type, pText) => {
    return Word.run(async (context) => {
      /**
       * Insert your Word code here
       */

      // insert a paragraph at the end of the document.
      if (type === "clause" || type === "information") {
        context.document.getSelection().insertParagraph(pText, Word.InsertLocation.after);
      } else if (type === "comment") {
        context.document.getSelection().insertComment(pText);
      }

      // change the paragraph color to blue.
      //paragraph.font.color = "blue";

      await context.sync();
    });
  };
}

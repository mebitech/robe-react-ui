import React from "react";
import { ShallowComponent } from "robe-react-commons";
import SideMenuSubItem from "./SideMenuSubItem";
import SideMenuItem from "./SideMenuItem";
import "./SideMenu.css";

/**
 * SideMenu is a collapsable accordion component.
 * Currently it supports 2 level of items.
 * @export
 * @class SideMenu
 * @extends {ShallowComponent}
 */
export default class SideMenu extends ShallowComponent {

    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Path of the selected item
         */
        selectedItem: React.PropTypes.string,
        /**
         * Items of the menu.
         */
        items: React.PropTypes.array.isRequired,
        /**
         * Change event of the sidemenu.
         * It is triggered if the selected sub-item changes, not collapsed menu.
         */
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        selectedItem: ""
    };

    /**
     * Holds the selected child of the menu
     *
     * @type {Object}
     */
    __selectedItem: undefined;

    render(): Object {
        return (
            <ul className="SideMenu-menu-content">
                {this.__renderMenuItems()}
            </ul>
        );
    }

    __renderMenuItems(): Object {
        let itemComps = [];
        let children = this.props.items[0].items;

        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.items && child.items.length > 0) {
                itemComps.push(<SideMenuItem
                    item={child}
                    onChange={this.__onChange}
                    selectedItem={this.props.selectedItem}
                />);
            } else {
                itemComps.push(<SideMenuSubItem
                    item={child}
                    onChange={this.__onChange}
                    selectedItem={this.props.selectedItem}
                />);
            }
        }
        return itemComps;
    }

    __onChange = (e: Object, menuItem: Object, subMenuItem: Object) => {
        if (subMenuItem === undefined && this.__selectedItem && this.__selectedItem !== menuItem) {
            this.__selectedItem.setState({
                active: false
            });
            this.__selectedItem.clearSelection();
        }
        this.__selectedItem = menuItem;
    };

}

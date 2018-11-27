// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Action } from "readium-desktop/common/models/redux";

import { Publication } from "readium-desktop/common/models/publication";
import { catalogActions } from "readium-desktop/common/redux/actions";
import { CatalogState } from "readium-desktop/common/redux/states/catalog";

const initialState: CatalogState = {
    publications: undefined,
    tagList: undefined,
};

export function catalogReducer(
    state: CatalogState = initialState,
    action: Action,
): CatalogState {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case catalogActions.ActionType.PublicationRemoveSuccess:
            const removedPub = action.payload.publication;
            newState.publications = [];

            for (const pub of state.publications) {
                if (pub.identifier === removedPub.identifier) {
                    continue;
                }

                newState.publications.push(pub);
            }
            return newState;
        case catalogActions.ActionType.PublicationAddSuccess:
        case catalogActions.ActionType.FileImportSuccess:
            const addedPub = action.payload.publication;
            newState.publications = [];

            for (const pub of state.publications) {
                if (pub.identifier === addedPub.identifier) {
                    // Publication already exists
                    continue;
                }

                newState.publications.push(pub);
            }

            newState.publications.push(addedPub);
            return newState;
        case catalogActions.ActionType.TagListSuccess:
            newState.tagList = action.payload.tagList;
            return newState;
        default:
            return state;
    }
}
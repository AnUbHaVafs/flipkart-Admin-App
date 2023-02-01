import { categoryConstants } from "../actions/constants"

const initState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategory = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []


            }
        ];
    }

    for (let cat of categories) {

        if (cat.id == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategory(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        }
        else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategory(parentId, cat.children, category) : []
            })
        }


    }
    return myCategories;
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:

            const category = action.payload.category;
            const updatedCategories = buildNewCategory(category.parentId, state.categories, category);

            console.log(updatedCategories);

            state = {
                ...state,
                loading: false,
                categories: updatedCategories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_fAILURE:
            state = {
                ...initState
            }
            break;
    }
    return state;
}
import ActionType from '../../constants/ActionType'

export const addEditImageAction = blobUrl => ({
    type: ActionType.ADD_EDIT_IMAGE,
    blobUrl: blobUrl,
});
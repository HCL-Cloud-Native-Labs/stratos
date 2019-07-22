import { GetCurrentUserRelationsComplete } from '../../../../cloud-foundry/src/actions/permissions.actions';
import { IOrgsRoleState } from '../../types/current-user-roles.types';
import { addNewRoles, removeOldRoles } from './current-user-reducer.helpers';
import { currentUserOrgRoleReducer } from './current-user-roles-org.reducer';

export function currentUserOrgRolesReducer(state: IOrgsRoleState = {}, action: GetCurrentUserRelationsComplete) {
  const { newState, addedIds } = addNewRoles(state, action, currentUserOrgRoleReducer);
  return removeOldRoles(newState, action, addedIds, currentUserOrgRoleReducer);
}

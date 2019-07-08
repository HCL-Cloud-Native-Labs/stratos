import { CfAPIResource } from '../../../store/src/types/api.types';
import { EndpointModel } from '../../../store/src/types/endpoint.types';
import { IFavoriteMetadata, UserFavorite, UserFavoriteEndpoint } from '../../../store/src/types/user-favorites.types';
import { IEntityMetadata } from './entity-catalogue/entity-catalogue.types';
import { FavoritesConfigMapper } from '../shared/components/favorites-meta-card/favorite-config-mapper';

export function isEndpointTypeFavorite(favorite: UserFavorite<IFavoriteMetadata>) {
  return !favorite.entityId;
}

export function getFavoriteFromCfEntity<T extends IEntityMetadata = IEntityMetadata>(
  entity,
  entityKey: string,
  favoritesConfigMapper: FavoritesConfigMapper
) {
  if (isCfEntity(entity as CfAPIResource)) {
    return favoritesConfigMapper.getFavoriteFromEntity<T>(
      entityKey,
      'cf',
      entity.entity.cfGuid,
      entity
    );
  }
  return null;
}

export function deriveEndpointFavoriteFromFavorite(favorite: UserFavorite<IFavoriteMetadata>) {
  if (favorite.entityType !== 'endpoint') {
    const endpointFav = {
      ...favorite
    };
    endpointFav.entityId = null;
    endpointFav.entityType = 'endpoint';
    endpointFav.guid = UserFavorite.buildFavoriteStoreEntityGuid(endpointFav);
    return endpointFav;
  }
  return favorite;
}

function isEndpointEntity(endpoint: EndpointModel) {
  return endpoint && endpoint.guid && endpoint.cnsi_type;
}

function isCfEntity(entity: CfAPIResource) {
  return entity && entity.entity.cfGuid && entity.metadata && entity.metadata.guid;
}

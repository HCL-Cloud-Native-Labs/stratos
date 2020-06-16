import {
  OrchestratedActionBuilders,
} from '../../../../../../store/src/entity-catalog/action-orchestrator/action-orchestrator';
import {
  GetHelmRelease,
  GetHelmReleaseGraph,
  GetHelmReleaseResource,
  GetHelmReleases,
  UpdateHelmReleaseManifestError,
} from './workloads.actions';

export interface WorkloadReleaseBuilders extends OrchestratedActionBuilders {
  get: (
    title: string,
    endpointGuid: string,
    extraArgs: { namespace: string }
  ) => GetHelmRelease;
  setManifestError: (
    endpointGuid: string,
    namespace: string,
    releaseTitle: string,
    manifestError: boolean) => UpdateHelmReleaseManifestError;
  getMultiple: () => GetHelmReleases;
}

export const workloadReleaseBuilders: WorkloadReleaseBuilders = {
  get: (title: string, endpointGuid: string, { namespace }: { namespace: string }) => {
    return new GetHelmRelease(endpointGuid, namespace, title);
  },
  setManifestError: (endpointGuid: string, namespace: string, releaseTitle: string, manifestError: boolean) =>
    new UpdateHelmReleaseManifestError(endpointGuid, namespace, releaseTitle, manifestError),
  getMultiple: () => new GetHelmReleases()
}

export interface WorkloadGraphBuilders extends OrchestratedActionBuilders {
  get: (
    releaseTitle: string,
    endpointGuid: string
  ) => GetHelmReleaseGraph
}

export const workloadGraphBuilders: WorkloadGraphBuilders = {
  get: (releaseTitle: string, endpointGuid: string) => new GetHelmReleaseGraph(endpointGuid, releaseTitle)
}

export interface WorkloadResourceBuilders extends OrchestratedActionBuilders {
  get: (
    releaseTitle: string,
    endpointGuid: string,
  ) => GetHelmReleaseResource
}

export const workloadResourceBuilders: WorkloadResourceBuilders = {
  get: (releaseTitle: string, endpointGuid: string) => new GetHelmReleaseResource(endpointGuid, releaseTitle)
}
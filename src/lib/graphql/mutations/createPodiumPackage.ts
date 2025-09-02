// src/lib/graphql/mutations/createPodiumPackage.ts
import { gql } from '@apollo/client';

export const CREATE_PODIUM_PACKAGE = gql`
  mutation createPodiumPackage(
    $userEmail: String, 
    $originalFilename: String!, 
    $projectId: String, 
    $languageCode: String, 
    $contentType: String
  ) {
    createPodiumPackage(
      userEmail: $userEmail, 
      originalFilename: $originalFilename, 
      projectId: $projectId,
      languageCode: $languageCode, 
      contentType: $contentType
    ) {
      podiumPackageGuid
      url
      key
      AWSAccessKeyId
      policy
      signature
    }
  }
`;
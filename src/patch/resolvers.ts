import { Resolvers } from "../generated/graphql";
import * as AWS from "aws-sdk";

const resolvers: Resolvers = {
  User: {
    patches: async (_, __, { auth }) => {
      console.log("AUTH: ", auth);
      if (!auth) {
        return [];
      }

      await AWS.config.update({
        ...AWS.config,
        region: "us-east-1",
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be",
          Logins: {
            [`cognito-idp.us-east-1.amazonaws.com/us-east-1_9vsr32SCz`]: auth.jwt
          }
        })
      });

      const s3 = new AWS.S3({
        apiVersion: "2006-03-01"
      });

      s3.listObjects(
        {
          Bucket: "argos-ecgs",
          Prefix: "c10d09b1-3940-4a7b-98e1-a804ef813f68"
        },
        (error: Error, data: AWS.S3.Types.ListObjectsOutput) => {
          if (error) {
            console.log("error: ", error);
          }

          if (data && data.Contents) {
            console.log("DATA:", data);

            data.Contents.map(obj => {
              if (obj.Key) {
                s3.getObject(
                  {
                    Bucket: "argos-ecgs",
                    Key: obj.Key
                  },
                  (e, objData) => {
                    if (e) {
                      console.log(e);
                    }

                    if (objData.Body) {
                      console.log(objData.Body.toString());
                    }
                  }
                );
              }
            });
          }
        }
      );

      return [
        {
          id: 1111,
          uuid: "1111",
          data: []
        }
      ];
    }
  }
};

export default resolvers;

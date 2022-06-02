import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { getTokenRequest, getTokenSuccess, getTokenFailure } from "../redux";

var qs = require("qs");
// var querystring = require("querystring");
// var request = require("sync-request");
// var request = require("then-request");
var jose = require("jsrsasign");
var base64url = require("base64url");
var __ = require("underscore");

function Callback(props) {
  const dispatch = useDispatch();
  var access_token = "dfds";
  var refresh_token = null;
  var scope = null;

  var rsaKey = {
    alg: "RS256",
    e: "AQAB",
    n:
      "p8eP5gL1H_H9UNzCuQS-vNRVz3NWxZTHYk1tG9VpkfFjWNKG3MFTNZJ1l5g_COMm2_2i_YhQNH8MJ_nQ4exKMXrWJB4tyVZohovUxfw-eLgu1XQ8oYcVYW8ym6Um-BkqwwWL6CXZ70X81YyIMrnsGTyTV6M8gBPun8g2L8KbDbXR1lDfOOWiZ2ss1CRLrmNM-GRp3Gj-ECG7_3Nx9n_s5to2ZtwJ1GS1maGjrSZ9GRAYLrHhndrL_8ie_9DS2T-ML7QNQtNkg2RvLv4f0dpjRYI23djxVtAylYK4oiT_uEMgSkc4dxwKwGuBxSO0g9JOobgfy0--FUHHYtRi0dOFZw",
    kty: "RSA",
    kid: "authserver",
  };
  var client = {
    client_id: "globomantics-client-1",
    client_secret: "globomantics-client-secret-1",
    redirect_uris: ["http://localhost:3000/callback"],
    scope: "taskView taskAdd taskEdit taskDelete",
  };
  var authServer = {
    authorizationEndpoint: "http://localhost:9003/authorize",
    tokenEndpoint: "http://localhost:9003/token",
  };

  let search = window.location.search;
  let params = new URLSearchParams(search);

  //#region    State Check
  const state = localStorage.getItem("state");
  //   localStorage.removeItem("state");
  let resState = params.get("state");

  if (resState == state) {
    console.log("State value matches: expected %s got %s", state, resState);
  } else {
    console.log("State DOES NOT MATCH: expected %s got %s", state, resState);
    console.log("error", {
      error: "State value did not match",
    });
    return;
  }

  //#endregion

  //#region Get Token

  let resCode = params.get("code");

  var form_data = qs.stringify({
    grant_type: "authorization_code",
    code: resCode,
    redirect_uri: client.redirect_uris[0],
  });

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      Buffer.from(
        //   URLSearchParams.toString(client.client_id) +
        // querystring.escape(client.client_id) +
        encodeURI(client.client_id) +
        ":" + //   querystring.escape(client.client_secret)
          encodeURI(client.client_secret)
      ).toString("base64"),
    "Access-Control-Allow-Origin": "*",
  };
  console.log("headers");
  console.log(headers);

  function requestToken(path, form_data, headers) {
    return new Promise(function(resolve, reject) {
      console.log("headers inside requestToken---");
      console.log(headers);
      console.log("form_data inside requestToken====");
      console.log(form_data);

      axios.post(path, form_data, { headers: headers }).then(
        (response) => {
          var result = response.data;
          console.log("Processing Request");
          resolve(result);
        },
        (error) => {
          console.log("errorr.....>");
          reject(error);
        }
      );
    });
  }

  async function processToken() {
    dispatch(getTokenRequest());

    let tokRes = await requestToken(
      authServer.tokenEndpoint,
      form_data,
      headers
    );

    if (tokRes.statusCode >= 200 && tokRes.statusCode < 300) {
      var body = tokRes;

      dispatch(getTokenSuccess(body));

      if (body.refresh_token) {
        refresh_token = body.refresh_token;
        console.log("Got refresh token: %s", refresh_token);
      }

      if (body.access_token) {
        access_token = body.access_token;
        console.log("Got access token: %s", body.access_token);

        // check the access token
        var pubKey = jose.KEYUTIL.getKey(rsaKey);
        var signatureValid = jose.jws.JWS.verify(body.access_token, pubKey, [
          "RS256",
        ]);
        if (signatureValid) {
          console.log("Signature validated.");
          var tokenParts = body.access_token.split(".");
          var payload = JSON.parse(base64url.decode(tokenParts[1]));
          console.log("Payload", payload);
          if (payload.iss == "http://localhost:9003/") {
            console.log("issuer OK");
            // TODO: this is incorrect. Fix the video and the code
            if (
              (Array.isArray(payload.aud) &&
                __.contains(payload.aud, "http://localhost:9002/")) ||
              payload.aud == "http://localhost:9002/"
            ) {
              console.log("Audience OK");

              var now = Math.floor(Date.now() / 1000);

              if (payload.iat <= now) {
                console.log("issued-at OK");
                if (payload.exp >= now) {
                  console.log("expiration OK");

                  console.log("Token valid!");
                }
              }
            }
          }
        }
      }

      scope = body.scope;
      console.log("Got scope: %s", scope);

      console.log("access_token%^%^%^%");
      console.log(access_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("scope", scope);
      localStorage.setItem("authorized", true);

      window.location.href = "http://localhost:3000";
    } else {
      let errorMsg =
        "Unable to fetch access token, server response: " + tokRes.statusCode;
      dispatch(getTokenFailure(errorMsg));
      console.log(errorMsg);
    }
  }
  processToken();

  //#endregion

  return <></>;
}

const mapStateToProps = (state) => {
  return {
    props: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTokenRequest: () => dispatch(getTokenRequest),
    getTokenSuccess: () => dispatch(getTokenSuccess),
    getTokenFailure: () => dispatch(getTokenFailure),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback);

// export default Callback;

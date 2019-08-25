import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          idToken: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-id"
        }
      )
    ).toEqual({
      idToken: "some-token",
      userId: "some-id",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();

//code-splitting
//injecting the "/notes" endpoint to the apiSlice(Main endpoint)
export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});
export const { useGetNotesQuery } = notesApiSlice;

//returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

//creates memorize selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
);

//getSelectors creates these selectors and we give them a different name as aliases
export const {
  selectAll: selectAllNotes,
  selectById: selectUserById,
  selectIds: selectNotesIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);

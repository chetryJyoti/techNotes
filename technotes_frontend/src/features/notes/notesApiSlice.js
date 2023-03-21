import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
  //done to keep the completed notes in the bottom of the table
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});
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
      // keepUnusedDataFor: 5,
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
    addNewNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNoteData,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});
export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

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
  selectById: selectNoteById,
  selectIds: selectNotesIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);

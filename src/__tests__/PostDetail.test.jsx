import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { postSlice } from "../store/slice";
import PostDetail from "../screens/PostDetail";

// Mock hooks from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    postId: "1",
  }),
  useNavigate: () => jest.fn().mockImplementation(() => () => {}),
}));

describe("PostDetail component with valid post", () => {
  const store = configureStore({
    reducer: {
      [postSlice.name]: postSlice.reducer,
    },
    preloadedState: {
      postSlice: {
        posts: [
          {
            id: "1",
            title: "Test Post",
            content: "Test Content",
            imageUrl: "https://example.com/test.jpg",
          },
        ],
      },
    },
  });

  test("renders the post details correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostDetail />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Post" })).toHaveAttribute(
      "src",
      "https://example.com/test.jpg"
    );
  });
});

describe("PostDetail component without posts", () => {
  const store = configureStore({
    reducer: {
      [postSlice.name]: postSlice.reducer,
    },
    preloadedState: {
      postSlice: {
        posts: [],
      },
    },
  });

  test("displays not found message when post does not exist", () => {
    render(
      <Provider
        store={{ ...store, preloadedState: { postSlice: { posts: [] } } }}
      >
        <MemoryRouter>
          <PostDetail />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Post not found =(")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });
});

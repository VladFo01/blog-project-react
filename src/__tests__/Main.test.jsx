import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "../store/slice";
import Main from "../screens/Main";
import { api } from "../store/api";

// Mock the RTK Query hook
jest.mock("../store/api", () => ({
  api: {
    useGetPostsQuery: jest.fn(),
  },
}));

describe("Main component", () => {
  const renderWithProviders = (
    ui,
    {
      preloadedState,
      store = configureStore({
        reducer: {
          [postSlice.name]: postSlice.reducer,
        },
        preloadedState,
      }),
      route = "/",
    } = {}
  ) => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    );
  };

  test("displays loading state correctly", () => {
    api.useGetPostsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    renderWithProviders(<Main />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", () => {
    api.useGetPostsQuery.mockReturnValue({
      data: undefined,
      error: { message: "Failed to fetch" },
      isLoading: false,
    });
    renderWithProviders(<Main />);
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  test("renders posts if data is available", () => {
    const posts = [
      {
        id: 1,
        title: "Test Post",
        summary: "Post Summary",
        content: "Test content",
        imageUrl:
          "https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-learning-feature.jpg",
      },
    ];
    api.useGetPostsQuery.mockReturnValue({
      data: posts,
      error: undefined,
      isLoading: false,
    });
    renderWithProviders(<Main />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Post Summary")).toBeInTheDocument();
  });
});

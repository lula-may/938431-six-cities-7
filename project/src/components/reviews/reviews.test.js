import React from 'react';
import {render, screen} from '@testing-library/react';
// import {Router} from 'react-router-dom';
// import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Reviews from './reviews';
import {AuthorizationStatus} from '../../const';

let fakeComponent = null;
const createMockStore = configureStore({});
let store = null;

// const commentProp = {
//   id: 15,
//   comment: 'Comment text',
//   date: '2021-07-28',
//   rating: 5,
//   user: {
//     avatarUrl: 'url.jpg',
//     id: 7,
//     isPro: false,
//     name: 'Nick',
//   },
// };

describe('Component: Reviews', () => {
  it('should render spinner when is loading', () => {
    store = createMockStore({
      COMMENTS: {
        comments: [],
        isError: false,
        isLoading: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'email@ya.ru',
      },
    });

    fakeComponent = (
      <Provider store={store} >
        <Reviews />
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
  });

  it('should render error message when on error', () => {
    store = createMockStore({
      COMMENTS: {
        comments: [],
        isError: true,
        isLoading: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'email@ya.ru',
      },
    });

    fakeComponent = (
      <Provider store={store} >
        <Reviews />
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/We failed to load reviews. Please, try again later./i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
  });

  it('should render correctly with add comment form when user is authorized', () => {
    store = createMockStore({
      COMMENTS: {
        comments: [
          {
            id: 15,
            comment: 'Fake comment text',
            date: '2021-07-28',
            rating: 5,
            user: {
              avatarUrl: 'url.jpg',
              id: 7,
              isPro: false,
              name: 'Nick',
            },
          },
          {
            id: 16,
            comment: 'bla-bla',
            date: '2021-07-28',
            rating: 4,
            user: {
              avatarUrl: 'url.jpg',
              id: 7,
              isPro: false,
              name: 'Helen',
            },
          },
        ],
        isError: false,
        isLoading: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'email@ya.ru',
      },
    });

    fakeComponent = (
      <Provider store={store} >
        <Reviews />
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake comment text/i)).toBeInTheDocument();
    expect(screen.getByText(/Nick/i)).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
  });

  it('should render correctly without add comment form when user is not authorized', () => {
    store = createMockStore({
      COMMENTS: {
        comments: [
          {
            id: 15,
            comment: 'Fake comment text',
            date: '2021-07-28',
            rating: 5,
            user: {
              avatarUrl: 'url.jpg',
              id: 7,
              isPro: false,
              name: 'Nick',
            },
          },
          {
            id: 16,
            comment: 'bla-bla',
            date: '2021-07-28',
            rating: 4,
            user: {
              avatarUrl: 'url.jpg',
              id: 7,
              isPro: false,
              name: 'Helen',
            },
          },
        ],
        isError: false,
        isLoading: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      },
    });

    fakeComponent = (
      <Provider store={store} >
        <Reviews />
      </Provider>
    );

    render(fakeComponent);

    expect(screen.getByText(/Reviews ·/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake comment text/i)).toBeInTheDocument();
    expect(screen.getByText(/Nick/i)).toBeInTheDocument();
    expect(screen.queryByText(/Your review/i)).toBeNull();
    expect(screen.queryByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeNull();
  });
});

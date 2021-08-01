import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import CommentForm from './comment-form';

const createMockStore = configureStore({});
let history = null;
let store = null;
let fakeCommentForm = null;

describe('Component: Comment Form', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = createMockStore({
      COMMENTS: {
        comments: [],
        isUploadingError: false,
        isUploading: false,
      },
    });

    fakeCommentForm = (
      <Provider store={store} >
        <Router history={history} >
          <CommentForm/>
        </Router>
      </Provider>
    );
  });

  it('should render correctly', () => {
    render(fakeCommentForm);

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i)).toBeInTheDocument();
  });

  it('should render comment on user typing and call dispatch on submit button click', () => {
    const dispatch = jest.fn();
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatch);

    render(fakeCommentForm);

    userEvent.type(screen.getByTestId('comment'), 'Hello, World! This is a fake comment. It should be not less then 50.');
    expect(screen.getByTestId('comment')).toHaveValue('Hello, World! This is a fake comment. It should be not less then 50.');

    userEvent.click(screen.getByTestId('rating-4'));
    userEvent.click(screen.getByTestId('submit'));

    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});

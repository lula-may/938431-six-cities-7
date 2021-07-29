import React from 'react';
import {render, screen} from '@testing-library/react';
import Comment from './comment';

let fakeComment = null;

describe('Component: Comment', () => {
  beforeAll(() => {
    const commentProp = {
      id: 15,
      comment: 'Comment text',
      date: '2021-07-28',
      rating: 5,
      user: {
        avatarUrl: 'url.jpg',
        id: 7,
        isPro: false,
        name: 'Nick',
      },
    };

    fakeComment = (
      <Comment
        comment={commentProp}
      />
    );
  });

  it('should render correctly', () => {
    render(fakeComment);

    expect(screen.getByText(/Nick/i)).toBeInTheDocument();
    expect(screen.getByText(/Comment text/i)).toBeInTheDocument();
    expect(screen.getByText(/July 2021/i)).toBeInTheDocument();
  });
});

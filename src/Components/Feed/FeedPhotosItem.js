import React from 'react';

const FeedItem = ({ id, email, description, deadline }) => {
  if (email == null) email = 'Minha postagem';
  return (
    <tr>
      <td>{id}</td>
      <td>{email}</td>
      <td>{description}</td>
      <td>{deadline}</td>
    </tr>
  );
};

export default FeedItem;

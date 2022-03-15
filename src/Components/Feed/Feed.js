import React from 'react';
import { USER_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import FeedPhotosItem from './FeedPhotosItem';
import styles from './Feed.module.css';

const Feed = () => {
  const token = window.localStorage.getItem('token');
  const { data, request, loading } = useFetch();

  React.useEffect(() => {
    async function fetchItems() {
      const { url, options } = USER_GET(token);
      await request(url, options);
    }
    fetchItems();
  }, [request, token]);
  if (data)
    return (
      <div>
        {
          <table className={styles.table}>
            <tr>
              <td>ID</td>
              <td>Email</td>
              <td>Descrição</td>
              <td>Prazo</td>
            </tr>
            {data.map((d) => (
              <FeedPhotosItem
                key={d.id}
                id={d.id}
                email={d.email}
                description={d.description}
                deadline={d.deadline}
              />
            ))}
          </table>
        }
      </div>
    );
  else return null;
};

export default Feed;

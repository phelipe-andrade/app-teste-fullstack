import React from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { ITEM_POST } from '../../api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router';
import Head from '../Helper/Head';

const UserPhotoPost = () => {
  const description = useForm();
  const deadline = useForm('date');
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();
  const [nav, setNav] = React.useState(false);
  React.useEffect(() => {
    if (nav) navigate('/conta');
  }, [nav, data, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      description: description.value,
      deadline: deadline.value,
    };

    const token = window.localStorage.getItem('token');
    const res = ITEM_POST(body, token);
    await request(res.url, res.options);
    setNav(true);
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste a sua tarefa" />
      <form onSubmit={handleSubmit}>
        <Input
          label="Descrição"
          type="textarea"
          name="textarea"
          {...description}
        />
        <Input label="Prazo" type="text" name="prazo" {...deadline} />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default UserPhotoPost;

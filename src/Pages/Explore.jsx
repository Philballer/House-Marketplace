import { toast } from 'react-toastify';

function Explore() {
  const notify = () =>
    toast.error('Constanze My Loveeeeeeee', {
      hideProgressBar: false,
    });

  return (
    <div>
      <h1>Explore</h1>
      <button onClick={notify}>Toast!</button>
    </div>
  );
}

export default Explore;

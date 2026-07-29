import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>首页</h1>
      <ul>
        <li>
          <Link to="/product">商品</Link>
        </li>
      </ul>
    </div>
  );
}

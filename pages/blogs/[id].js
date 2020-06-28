import fetch from 'isomorphic-unfetch';

const BlogId = ({blog}) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <h2>この行はnext.jsで書いた</h2>
      <div>
        {blog.tags.map(tag => (
          <React.Fragment key={tag.id}>
            <span>{tag.name}</span>
          </React.Fragment>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    // headers: {'X-API-KEY': process.env.API_KEY},
    headers: {'X-API-KEY': "a10fe8ce-01bc-45c8-9309-7f1a78298021"},
  };

  const res = await fetch(
    `https://sota_sample.microcms.io/api/v1/blogs/`,
    key,
  );
  const repos = await res.json();
  console.log('----------')
  console.log(key)
  console.log('----------')
  console.log(repos)
  console.log('----------')
  const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
  return {paths, fallback: false};
  };

export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(
    `https://sota_sample.microcms.io/api/v1/blogs/${id}`,
    key,
  );
  const blog = await res.json();

  return {
    props : {
      blog: blog,
    }
  };
};

export default BlogId;
<script lang="ts">
  import {Link} from "svelte-navigator";

</script>

<nav class="">   
  <Link to="/">Home</Link>
	<Link to="admin">Admin</Link>
	<Link to="exercise">Exercise</Link>
  <Link to="login">Login</Link>
</nav>


<style>
  nav {
    width: 100vw;

    height: 64px;

    background-color: #eeeeee;

    gap: 2rem;
    padding: 0 1rem;

    display: flex;
    align-items: center;
  }

  nav > a:hover {
    text-decoration: underline;
  }

  nav > div {
    height: 100%;
    transition-duration: 300ms;

    display: flex;
    align-items: center;

    padding: 0 0.5rem;
  }

  nav > div:hover {
    cursor: pointer;
    background-color: #cccccc;
  }

  nav > div > *:hover {
    cursor: pointer;
  }
</style>
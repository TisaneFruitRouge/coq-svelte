<script>
	import { Router, Route } from "svelte-navigator";
	import Home from "./routes/Home.svelte";
	import Admin from "./routes/Admin.svelte";
	import Exercise from "./routes/Exercise.svelte";
	import Login from "./routes/Login.svelte";

  import TheNavbar from "./lib/TheNavbar.svelte";
</script>

<Router>
  <TheNavbar />
	<div>
		<Route path="/">
			<Home />
		</Route>
		<Route path="admin" component={Admin} />
		<Route path="exercise">
			<Exercise />
		</Route>
		<Route path="login">
			<Login />
		</Route>
	</div>
</Router>

<style>
  nav {
    height: 2em;
    background-color: bisque;
  }
</style>   
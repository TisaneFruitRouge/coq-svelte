<script>
    let name = '';
    let password = '';

    import {login} from '../lib/utils/supabse';
    import { user } from '../store'

    const loginUser = async () => {
        let resp = await login(name.trim(), password.trim())
        if (resp.data.length > 0) {
            let dbUser = resp.data[0]; 
            user.set({
                name: dbUser.name,
                isAdmin: dbUser.is_admin,
                isStudent: dbUser.is_student
            });
            window.location.href = dbUser.is_student ? '/home' : '/admin' 
        }
    }
</script>

<div id="wrapper">
    <div class="input-group">
        <label for="name">Nom</label>
        <input bind:value={name} id="name" type="text">
    </div>
    <div class="input-group">
        <label for="password">Mot de passe</label>
        <input bind:value={password} id="password" type="password">
    </div>
    <button on:click={loginUser} >SE CONNECTER</button>
</div>

<style>
    #wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background-color: #eeeeee;
        padding: 1em;
        border-radius: 10px;

        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 10px;
    }

    .input-group {
        width: 100%;
        display: flex;
    }

    label {
        width: 35%;
    }

    input {
        width: 75%;
    }

    button {
        width: 100%;
        text-align: center;

        background-color: #cccccc;
        padding: 5px;
        border-radius: 5px;
    }
</style>
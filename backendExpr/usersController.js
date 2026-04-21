import {users} from './usersData.js';

// returns all users without password
export const getAllUsers = (req, res) => {
    try {
        const safeUsers = users.map(({password, ...user}) => user);
        res.json(safeUsers);
    } catch (err) {
        res.status(500).json({error: "Failed to fetch users"});
    }
};

export const getUserId = (req, res) => {
    try {
        const {id} = req.params;
        const user = users.find(u => u.id === parseInt(id));
        if (!user) return res.status(404).json({error: 'User not found'});
        const {password, ...safeUser} = user;
        res.json(safeUser);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

// login that uses by matching email and password
// no database for storing is used, no encryption used, so now it's not safe -> needs to be added
export const loginUser = (req, res) => {
    try {
        const {email, password} = req.body;
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) return res.status(404).json({error: 'Invalid email or password'});
        const {password: pwd, ...safeUser} = user;
        res.json({message: "Login successful", user: safeUser});
    } catch (err) {
        res.status(500).json({ error: "Failed to login" });
    }
};



export const registerUser = (req, res) => {
  try {
      const {username,email,password} = req.body;
      const exists = users.find(u => u.email === email);
      if (exists) return res.status(400).json({error: "Email already exists"});
      const newUser = {
          id: users.length + 1,
          username,
          email,
          password,
          avatar: `https://i.pravatar.cc/150?img=${users.length + 1} `,
      };
      users.push(newUser);
      const {password: pwd, ...safeUser} = newUser;
      res.status(201).json({message: "Register successful", user: safeUser});
  } catch (err) {
      res.status(500).json({ error: "Failed to register" });
  }
};



export const updateUser = (req, res) => {
    try {
        const {id} = req.params;
        const {username,email,password,avatar} = req.body;
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index === -1) return res.status(404).json({error: 'User not found'});
        users[index] = {
            ...users[index],
            username: username || users[index].username,
            email: email || users[index].email,
            password: password || users[index].password,
            avatar: avatar || users[index].avatar,
        };
        const {password: pwd, ...safeUser} = users[index];
        res.json({message: "Update successful", user: safeUser});
    } catch (err) {
        res.status(500).json({error: "Failed to update user"});
    }
};


export const deleteUser = (req, res) => {
    try {
        const {id} = req.params;
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index === -1) return res.status(404).json({error: 'User not found'});
        users.splice(index, 1);
        res.json({message: "Delete successful"});
    } catch (err) {
        res.status(500).json({error: "Failed to delete user"});
    }
};




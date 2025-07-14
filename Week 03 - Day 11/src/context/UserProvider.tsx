import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  getUserById: (id: string | number) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


const DEFAULT_USERS: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 22 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];


export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : DEFAULT_USERS;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);


  const addUser = (user: Omit<User, 'id'>) => {
    setUsers((prev: User[]) => [
      ...prev,
      { ...user, id: Date.now() },
    ]);
  };


  const getUserById = (id: string | number) => users.find((u: User) => String(u.id) === String(id));

  return (
    <UserContext.Provider value={{ users, addUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}

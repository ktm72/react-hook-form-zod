import { useEffect } from "react";
import { UserSchemaWithGeo } from "../schema/users";
import z from "zod";

const UserResults = z.array(UserSchemaWithGeo);

type UserArray = z.infer<typeof UserResults>;

const Users = () => {
  async function fetchUsers(): Promise<UserArray | undefined> {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!res.ok) return undefined;

      const usersJson: UserArray = await res.json();

      const parsedData = UserResults.parse(usersJson);

      console.log(parsedData);

      return parsedData;
    } catch (err) {
      if (err instanceof Error) console.log(err.stack);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  return <div>Users....</div>;
};

export default Users;

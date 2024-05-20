import { generateRandomName } from "@/lib/utils";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avatar";
import styles from "./index.module.css";
import { useMemo } from "react";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;
  const memoisedUsers = useMemo(() => {
    return (
      <main className=" flex items-center justify-center gap-1 py-2">
        <div className="flex pl-3">
          {currentUser && <Avatar name="You" otherStyles="-ml-3" />}
          {users.slice(0, 3).map(({ connectionId }) => {
            return (
              <Avatar
                key={connectionId}
                name={generateRandomName()}
                otherStyles="border-[3px] border-primary-green"
              />
            );
          })}

          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 3}</div>
          )}
        </div>
      </main>
    );
  }, [users.length]);
  return memoisedUsers;
};

export default ActiveUsers;

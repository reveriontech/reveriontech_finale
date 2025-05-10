import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Time "mo:base/Time";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Types "./usersType";

module {
    public class ReverionUsers(userEntries: [(Principal, Types.User)]) {
        private let users = HashMap.HashMap<Principal, Types.User>(0, Principal.equal, Principal.hash);
        
        public func init() {
            for ((principal, user) in userEntries.vals()) {
                users.put(principal, user);
            };
        };
        
        public func getEntries() : [(Principal, Types.User)] {
            return Iter.toArray(users.entries());
        };
        
        public func createUser(caller: Principal) : Result.Result<Types.User, Text> {
            if (Principal.isAnonymous(caller)) {
                return #err("Unauthorized Access. User generation has been rejected.");
            };

            switch (users.get(caller)) {
                case (?_) {
                    return #err("User information has already been registered.");
                };
                case null {
                let username = "User_" # Principal.toText(caller);

                let newUser : Types.User = {
                    principalId = caller;
                    profile = "";
                    username = username;
                    firstName = "";
                    middleName = "";
                    lastName = "";
                    mobile = "";
                    userType = #User;
                    userLevel = #L1;
                    createdAt = Time.now();
                    updatedAt = Time.now();
                };

                users.put(caller, newUser);
                return #ok(newUser);
                };
            };
        };
        
        public func getUser(caller: Principal) : Result.Result<Types.User, Text> {
            if (Principal.isAnonymous(caller)) {
                return #err("Unauthorized Access. User generation has been rejected.");
            };

            switch (users.get(caller)) {
                case (?user) { #ok(user) };
                case null { #err("Unauthorized State. User information cannot be found.") };
            };
        };

        public func getAllUsers() : [Types.User] {
            return Iter.toArray(users.vals());
        };
    };
}
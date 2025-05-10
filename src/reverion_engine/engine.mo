import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Types "users/usersType";
import ReverionUsers "users/reverionUsers";

actor User {
    private stable var userEntries : [(Principal, Types.User)] = [];
    private var reverionUsers = ReverionUsers.ReverionUsers(userEntries);

    system func preupgrade() {
        userEntries := reverionUsers.getEntries();
    };

    system func postupgrade() {
        reverionUsers.init();
    };

    public shared ({ caller }) func createUser(
        principalId: Principal
    ) : async Result.Result<Types.User, Text> {
        if (not (caller == principalId)) {
            return #err("Unauthorized Access. User generation has been rejected.");
        };
        return reverionUsers.createUser(caller);
    };

    public shared ({ caller }) func getUser(
        principalId: Principal
    ) : async Result.Result<Types.User, Text> {
        if (not (caller == principalId)) {
            return #err("Unauthorized Access. User fetching has been rejected.");
        };
        return reverionUsers.getUser(caller);
    };

    public shared func getAllUsers(
        principalId: Principal
    ) : async Result.Result<[Types.User], Text> {
        return #ok(reverionUsers.getAllUsers());
    };
}
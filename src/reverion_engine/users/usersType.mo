module {

    public type UserType = {
        #User;
        #Admin;
    };

    public type UserLevel = {
        #L1;
        #L10;
        #L100;
    };

    public type User = {
        principalId: Principal;
        profile: Blob;
        username: Text;
        firstName: Text;
        middleName: Text;
        lastName: Text;
        mobile: Text;
        userType: UserType;
        userLevel: UserLevel;
        createdAt: Int;
        updatedAt: Int;
    };
}
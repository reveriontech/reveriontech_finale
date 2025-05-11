module {

    public type UserType = {
        #User;
        #Admin;
    };

    public type UserLevel = {
        #L1;
        #L2;
        #L3;
        #L4;
        #L5;
        #L6;
        #L7;
        #L8;
        #L9;
        #L10;
    };

    public type User = {
        principalId: Principal;
        profile: Text;
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
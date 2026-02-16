import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type QuizQuestion = {
    id : Nat;
    question : Text;
    choices : [Text];
    correctChoice : Nat;
  };

  type Quiz = {
    id : Nat;
    title : Text;
    topic : Text;
    questions : [QuizQuestion];
  };

  type QuizAttempt = {
    attemptId : Nat;
    quizId : Nat;
    timestamp : Int;
    score : Nat;
  };

  public type UserProfile = {
    name : Text;
    rank : ?Text;
    unit : ?Text;
  };

  let quizzes = Map.empty<Nat, Quiz>();
  let attempts = Map.empty<Principal, [QuizAttempt]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile unless you are an admin");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Quiz Management - Public access (educational content available to all)
  public query ({ caller }) func getQuizzes() : async [Quiz] {
    quizzes.values().toArray();
  };

  public query ({ caller }) func getQuiz(id : Nat) : async Quiz {
    switch (quizzes.get(id)) {
      case (null) { Runtime.trap("Quiz not found") };
      case (?quiz) { quiz };
    };
  };

  public query ({ caller }) func getQuizQuestions(quizId : Nat) : async [QuizQuestion] {
    switch (quizzes.get(quizId)) {
      case (null) { Runtime.trap("Quiz not found") };
      case (?quiz) { quiz.questions };
    };
  };

  module QuizAttempt {
    public func compare(a : QuizAttempt, b : QuizAttempt) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  // Quiz Attempts - Requires authenticated user
  public shared ({ caller }) func submitQuizAttempt(quizId : Nat, score : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit quiz attempts");
    };

    let timestamp = Time.now();
    let attemptId = timestamp.toNat();

    let attempt : QuizAttempt = {
      attemptId;
      quizId;
      timestamp;
      score;
    };

    let attemptsForCaller = switch (attempts.get(caller)) {
      case (?existing) { existing };
      case (null) { [] };
    };

    let updatedAttempts = (attemptsForCaller.concat([attempt])).sort();
    attempts.add(caller, updatedAttempts);
    attemptId;
  };

  public query ({ caller }) func getProgress() : async [QuizAttempt] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view progress");
    };
    
    switch (attempts.get(caller)) {
      case (?attemptsForCaller) { attemptsForCaller };
      case (null) { [] };
    };
  };
};

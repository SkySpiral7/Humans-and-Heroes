'use strict';
function VersionObject(major, minor)
{
   this.major = major;
   this.minor = minor;
   this.toString=function(){return (this.major + '.' + this.minor);};
   this.clone=function(){return new VersionObject(this.major, this.minor);};

   /**return (this > other);
   The other parameter must be a VersionObject*/
   this.isGreaterThan=function(other, b)
   {
      if(undefined !== b) other = new VersionObject(other, b);
      if(this.major > other.major) return true;
      if(this.major < other.major) return false;
      return (this.minor > other.minor);
   };
   /**return (this < other);
   The other parameter must be a VersionObject*/
   this.isLessThan=function(other, b)
   {
      if(undefined !== b) other = new VersionObject(other, b);
      if(this.major < other.major) return true;
      if(this.major > other.major) return false;
      return (this.minor < other.minor);
   };
   /**return (this === other);
   The other parameter must be a VersionObject*/
   this.equals=function(other, b)
   {
      if(undefined !== b) other = new VersionObject(other, b);
      return (this.major === other.major && this.minor === other.minor);
   };
   /**return (this >= other);
   The other parameter must be a VersionObject*/
   this.isGreaterThanOrEqualTo=function(other, b)
   {
      if(undefined !== b) other = new VersionObject(other, b);
      return (this.isGreaterThan(other) || this.equals(other));
   };
   //create functions only as needed
}

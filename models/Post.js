


// Using Define model method
module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("posts", {
      
        title: {
            type: DataTypes.STRING,
            required: true,
        },
        summary: {
            type: DataTypes.STRING,
            required: true,
            
        },
       
        
    },
    {
        timestamps: true,
    }
    )
     return Post;
}
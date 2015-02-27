angular.module('eggly.models.categories', [
  'firebaseFactory'
])
  .service('categories', function CategoriesService($q,FirebaseOperations) {
    var categories,
      currentCategory,
      categoriesModel = this;

    categoriesModel.getCategories = function () {
      categories = FirebaseOperations.getCategories();
      return categories;
    };

    categoriesModel.getCurrentCategory = function () {
      return currentCategory;
    };

    categoriesModel.getCurrentCategoryName = function () {
      return currentCategory ? currentCategory.name : '';
    };

    categoriesModel.setCurrentCategory = function (category) {
      currentCategory = category;
      return currentCategory;
    };

    categoriesModel.createCategory = function (category) {
      category.id = new Date();
      FirebaseOperations.addCategory(category);
    };

    categoriesModel.deleteCategory = function (category) {
      FirebaseOperations.removeCategory(category);
    };

    categoriesModel.getCategoryByName = function (categoryName) {
      var deferred = $q.defer();

      function findCategory() {
        return _.find(categories, function (c) {
          return c.name == categoryName;
        })
      }

      if (categories) {
        deferred.resolve(findCategory());
      } else {
        categoriesModel.getCategories().then(function () {
          deferred.resolve(findCategory());
        })
      }

      return deferred.promise;
    };

  });

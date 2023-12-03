<template>
  <form action="./" method="get" autocomplete="off" novalidate="true">
    <div class="subheader mb-2">Category</div>
    <div class="list-group list-group-transparent mb-3">
      <a class="list-group-item list-group-item-action d-flex align-items-center active" href="#">
        Games
        <small class="text-secondary ms-auto">24</small>
      </a>
      <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
        Clothing
        <small class="text-secondary ms-auto">149</small>
      </a>
      <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
        Jewelery
        <small class="text-secondary ms-auto">88</small>
      </a>
      <a class="list-group-item list-group-item-action d-flex align-items-center" href="#">
        Toys
        <small class="text-secondary ms-auto">54</small>
      </a>
    </div>
    <div class="subheader mb-2">Tags</div>
    <div class="mb-3">
      <label class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          name="form-tags[]"
          value="business"
          checked="true"
        />
        <span class="form-check-label">business</span>
      </label>
      <label class="form-check">
        <input type="checkbox" class="form-check-input" name="form-tags[]" value="evening" />
        <span class="form-check-label">evening</span>
      </label>
      <label class="form-check">
        <input type="checkbox" class="form-check-input" name="form-tags[]" value="leisure" />
        <span class="form-check-label">leisure</span>
      </label>
      <label class="form-check">
        <input type="checkbox" class="form-check-input" name="form-tags[]" value="party" />
        <span class="form-check-label">party</span>
      </label>
    </div>
    <div class="mt-5">
      <button class="btn btn-primary w-100 disabled">Reset filters</button>
    </div>
  </form>
</template>
